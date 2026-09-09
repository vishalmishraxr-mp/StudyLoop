const Tag = require("../models/Tags");

exports.createTag = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required",
            });
        }

        const tagDetails = await Tag.create({ name: name.trim(), description });

        return res.status(201).json({
            success: true,
            message: "Tag created successfully",
            data: tagDetails,
        });
    } catch (error) {
        console.error("createTag:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.showAllTags = async (req, res) => {
    try {
        const allTags = await Tag.find({}).populate("course");

        return res.status(200).json({
            success: true,
            message: "All tags fetched successfully",
            data: allTags,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { tagId, name, description } = req.body;

        if (!tagId || !name) {
            return res.status(400).json({
                success: false,
                message: "Tag ID and name are required",
            });
        }

        const tag = await Tag.findByIdAndUpdate(
            tagId,
            { name: name.trim(), description },
            { new: true }
        );

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data: tag,
        });
    } catch (error) {
        console.error("updateTag:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const tagId = req.params.tagId || req.body.tagId;

        if (!tagId) {
            return res.status(400).json({
                success: false,
                message: "Tag ID is required",
            });
        }

        const tag = await Tag.findByIdAndDelete(tagId);

        if (!tag) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully",
        });
    } catch (error) {
        console.error("deleteTag:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
