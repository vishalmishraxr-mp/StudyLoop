const express = require("express");
const router = express.Router();

const {
    getAdminStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllCoursesAdmin,
} = require("../controller/Admin");
const { auth, isAdmin } = require("../middleware/auth");

router.get("/stats", auth, isAdmin, getAdminStats);
router.get("/users", auth, isAdmin, getAllUsers);
router.put("/user/role", auth, isAdmin, updateUserRole);
router.delete("/user/delete", auth, isAdmin, deleteUser);
router.get("/courses", auth, isAdmin, getAllCoursesAdmin);

module.exports = router;

