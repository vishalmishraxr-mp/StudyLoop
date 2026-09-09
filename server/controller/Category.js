const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
    try {
        const { name, description, descripttion } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name: name.trim(),
            description: description ?? descripttion ?? "",
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    } catch (error) {
        console.error("createCategory:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate("courses");

        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            categories,
        });
    } catch (error) {
        console.error("showAllCategories:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
        });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { categoryId, name, description } = req.body;

        if (!categoryId || !name) {
            return res.status(400).json({
                success: false,
                message: "Category ID and name are required",
            });
        }

        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name: name.trim(), description },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category,
        });
    } catch (error) {
        console.error("updateCategory:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update category",
            error: error.message,
        });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId || req.body.categoryId;

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required",
            });
        }

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.error("deleteCategory:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
    try {
        const categoryId = req.body.categoryId || req.params.categoryId;

        const selectedCategory = await Category.findById(categoryId)
            .populate({ path: "courses", match: { status: "Published" } });

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Selected category not found",
            });
        }

        const differentCategories = await Category.find({
            _id: { $ne: categoryId },
        });

        const topSellingCourses = await Course.aggregate([
            { $match: { status: "Published" } },
            {
                $addFields: {
                    enrolledStudents: { $size: "$studentsEnrolled" },
                },
            },
            { $sort: { enrolledStudents: -1 } },
            { $limit: 10 },
        ]);

        return res.status(200).json({
            success: true,
            message: "Category page details fetched successfully",
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
            },
        });
    } catch (error) {
        console.error("categoryPageDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to show category page details",
        });
    }
};
