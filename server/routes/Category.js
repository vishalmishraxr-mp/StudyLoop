const express = require("express");
const router = express.Router();

const {
    createCategory,
    showAllCategories,
    updateCategory,
    deleteCategory,
    categoryPageDetails,
} = require("../controller/Category");
const { auth, isAdmin } = require("../middleware/auth");

router.post("/create", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.put("/update", auth, isAdmin, updateCategory);
router.delete("/delete/:categoryId", auth, isAdmin, deleteCategory);
router.post("/categoryPageDetails", categoryPageDetails);

module.exports = router;
