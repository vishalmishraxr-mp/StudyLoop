const express = require("express");
const router = express.Router();

const { createTag, showAllTags, updateTag, deleteTag } = require("../controller/Tags");
const { auth, isAdmin } = require("../middleware/auth");

router.post("/create", auth, isAdmin, createTag);
router.get("/showAllTags", showAllTags);
router.put("/update", auth, isAdmin, updateTag);
router.delete("/delete/:tagId", auth, isAdmin, deleteTag);

module.exports = router;
