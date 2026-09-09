const User = require("../models/User");
const OTP = require("../models/Otp");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();


exports.sendOTP = async (req, res) => {
    try {
        console.log("🔥 SEND OTP CALLED");

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Delete previous OTP
        await OTP.deleteMany({
            email: normalizedEmail,
        });

        // Generate OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Save OTP
        await OTP.create({
            email: normalizedEmail,
            otp: Number(otp),
        });

        const emailBody = `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                border: 1px solid #ddd;
                border-radius: 10px;
            ">

                <h2>StudyLoop Email Verification</h2>

                <p>Your OTP for email verification is:</p>

                <h1 style="
                    letter-spacing: 8px;
                    text-align: center;
                ">
                    ${otp}
                </h1>

                <p>
                    This OTP is valid for 5 minutes.
                </p>

                <p>
                    If you did not request this OTP,
                    please ignore this email.
                </p>

            </div>
        `;

        // Send email ONLY HERE
        const mailResponse = await mailSender(
            normalizedEmail,
            "StudyLoop - Email Verification OTP",
            emailBody
        );

        console.log(
            "OTP email sent:",
            mailResponse.messageId
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",

            ...(process.env.NODE_ENV === "development"
                ? { otp }
                : {}),
        });

    } catch (error) {
        console.error("sendOTP:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message,
        });
    }
};
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            confirnPassword,
            accountType = "Student",
            contactNumber,
            otp,
        } = req.body;

        const finalConfirmPassword = confirmPassword || confirnPassword;

        if (!firstName || !lastName || !email || !password || !finalConfirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "Required data is missing",
            });
        }

        if (password !== finalConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        if (await User.findOne({ email: normalizedEmail })) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const recentOtp = await OTP.findOne({
            email: normalizedEmail,
            otp: Number(otp),
        }).sort({ createdAt: -1 });

        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            contactNumber: contactNumber || "",
        });

        const user = await User.create({
            firstName,
            lastName,
            email: normalizedEmail,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(`${firstName} ${lastName}`)}`,
        });

        await OTP.deleteMany({ email: normalizedEmail });

        return res.status(201).json({
            success: true,
            message: "Registration completed successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
        });
    } catch (error) {
        console.error("signUp:", error);
        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() })
            .populate("additionalDetails");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        user.token = token;
        await user.save();

        const safeUser = user.toObject();
        delete safeUser.password;
        delete safeUser.token;

        res.cookie("token", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            success: true,
            token,
            user: safeUser,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error("login:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All password fields are required",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match",
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await mailSender(
            user.email,
            "Password Updated",
            "<p>Your StudyLoop password was updated successfully.</p>"
        );

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        console.error("changePassword:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to change password",
        });
    }
};
