const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const token = req.cookies?.token || req.body?.token || bearerToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const roleCheck = (role) => (req, res, next) => {
    const accountType = String(req.user?.accountType || "").toLowerCase();

    if (accountType !== role.toLowerCase()) {
        return res.status(403).json({
            success: false,
            message: `This route is protected for ${role}s only`,
        });
    }

    next();
};

exports.isStudent = roleCheck("Student");
exports.isInstructor = roleCheck("Instructor");
exports.isAdmin = roleCheck("Admin");
