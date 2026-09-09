const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber = "", gender = "" } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = await Profile.findByIdAndUpdate(
            user.additionalDetails,
            { dateOfBirth, about, gender, contactNumber },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        });
    } catch (error) {
        console.error("updateProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Profile update failed",
        });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await Profile.findByIdAndDelete(user.additionalDetails);
        await User.findByIdAndDelete(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("deleteProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to delete account",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id)
            .select("-password -token")
            .populate("additionalDetails")
            .populate("courses");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            userDetails,
        });
    } catch (error) {
        console.error("getAllUserDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to get user details",
        });
    }
};
