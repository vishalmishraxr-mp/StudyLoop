const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageuploader");

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description, timeDuration } = req.body;
        const video = req.files?.videoFile || req.files?.videofile || req.files?.video;

        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({
                success: false,
                message: "All subsection fields and video are required",
            });
        }

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME,
            null,
            null,
            "video"
        );

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        });

        section.subSection.push(subSectionDetails._id);
        await section.save();

        return res.status(201).json({
            success: true,
            message: "Subsection created successfully",
            subsection: subSectionDetails,
            section,
        });
    } catch (error) {
        console.error("createSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Subsection creation failed",
            error: error.message,
        });
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        const {
            subSectionId,
            SubSectionId,
            title,
            description,
            timeDuration,
        } = req.body;

        const id = subSectionId || SubSectionId;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID is required",
            });
        }

        const update = {};
        if (title !== undefined) update.title = title;
        if (description !== undefined) update.description = description;
        if (timeDuration !== undefined) update.timeDuration = timeDuration;

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            id,
            update,
            { new: true, runValidators: true }
        );

        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            updatedSubSection,
        });
    } catch (error) {
        console.error("updateSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Subsection update failed",
        });
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const subSectionId = req.params.subSectionId || req.body.subSectionId;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID is required",
            });
        }

        const deleted = await SubSection.findByIdAndDelete(subSectionId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        await Section.updateMany(
            { subSection: subSectionId },
            { $pull: { subSection: subSectionId } }
        );

        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
        });
    } catch (error) {
        console.error("deleteSubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Subsection deletion failed",
        });
    }
};
