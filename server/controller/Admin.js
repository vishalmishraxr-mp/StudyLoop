const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const Tag = require("../models/Tags");

// Get platform overview statistics
exports.getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalStudents = await User.countDocuments({ accountType: "Student" });
        const totalInstructors = await User.countDocuments({ accountType: "Instructor" });
        const totalAdmins = await User.countDocuments({ accountType: "Admin" });

        const totalCourses = await Course.countDocuments({});
        const publishedCourses = await Course.countDocuments({ status: "Published" });
        const draftCourses = await Course.countDocuments({ status: "Draft" });

        // Calculate total revenue from published courses * enrolled students
        const allPublishedCourses = await Course.find({ status: "Published" }).select("price studentsEnrolled");
        const totalRevenue = allPublishedCourses.reduce((acc, course) => {
            const enrolledCount = course.studentsEnrolled?.length || 0;
            return acc + (course.price * enrolledCount);
        }, 0);

        const totalCategories = await Category.countDocuments({});
        const totalTags = await Tag.countDocuments({});

        const recentUsers = await User.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .select("firstName lastName email accountType image createdAt");

        const recentCourses = await Course.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("instructor", "firstName lastName email")
            .populate("category", "name")
            .select("courseName price status createdAt thumbnail");

        return res.status(200).json({
            success: true,
            message: "Admin statistics fetched successfully",
            stats: {
                totalUsers,
                totalStudents,
                totalInstructors,
                totalAdmins,
                totalCourses,
                publishedCourses,
                draftCourses,
                totalRevenue,
                totalCategories,
                totalTags,
            },
            recentUsers,
            recentCourses,
        });
    } catch (error) {
        console.error("getAdminStats error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin stats",
            error: error.message,
        });
    }
};

// Get all users with optional role filtering
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { accountType: role } : {};

        const users = await User.find(filter)
            .select("-password")
            .populate("additionalDetails")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("getAllUsers error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// Update user account type (Role)
exports.updateUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (!userId || !newRole || !["Student", "Instructor", "Admin"].includes(newRole)) {
            return res.status(400).json({
                success: false,
                message: "Valid userId and newRole (Student, Instructor, Admin) are required",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.accountType = newRole;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User role updated to ${newRole}`,
            user,
        });
    } catch (error) {
        console.error("updateUserRole error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: error.message,
        });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        if (userId === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own admin account",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("deleteUser error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

// Get all courses across platform for admin view
exports.getAllCoursesAdmin = async (req, res) => {
    try {
        const courses = await Course.find({})
            .populate("instructor", "firstName lastName email image")
            .populate("category", "name")
            .populate("tag", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            courses,
        });
    } catch (error) {
        console.error("getAllCoursesAdmin error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch platform courses",
            error: error.message,
        });
    }
};

