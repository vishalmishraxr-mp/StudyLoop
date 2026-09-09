const express = require("express");
const router = express.Router();

const {
    sendOTP,
    signUp,
    login,
    changePassword,
} = require("../controller/Auth");
const {
    resetPasswordToken,
    resetPassword,
} = require("../controller/resetPassword");
const { auth } = require("../middleware/auth");

router.post("/send-otp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/change-password", auth, changePassword);
router.post("/forgot-password", resetPasswordToken);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
