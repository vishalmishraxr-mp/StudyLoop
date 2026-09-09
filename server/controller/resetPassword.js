const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const passwordUpdate = require("../mail/templates/passwordUpdate");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not registered with this email",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        await User.findByIdAndUpdate(user._id, {
            token,
            resetPassExpire: new Date(Date.now() + 5 * 60 * 1000),
        });

        const requestOrigin = req.get("origin");
        const frontendUrl = requestOrigin || process.env.FRONTEND_URL || "http://localhost:5173";
        const url = `${frontendUrl.replace(/\/$/, "")}/update-password/${token}`;

        await mailSender(
            normalizedEmail,
            "StudyLoop Password Reset",
            passwordUpdate(
                url,
                `${user.firstName} ${user.lastName}`.trim()
            )
        );

        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully",
        });
    } catch (error) {
        console.error("resetPasswordToken:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "Password, confirm password and token are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters",
            });
        }

        const user = await User.findOne({
            token,
            resetPassExpire: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        user.password = await bcrypt.hash(password, 10);
        user.token = null;
        user.resetPassExpire = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("resetPassword:", error);
        return res.status(500).json({
            success: false,
            message: "Password cannot be reset",
        });
    }
};
