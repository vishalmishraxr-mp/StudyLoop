const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteProfile,
    getAllUserDetails,
} = require("../controller/Profile");
const { auth } = require("../middleware/auth");

router.put("/update-profile", auth, updateProfile);
router.delete("/delete-profile", auth, deleteProfile);
router.get("/get-user-details", auth, getAllUserDetails);

module.exports = router;
