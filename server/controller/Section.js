const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section name and course ID are required",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const newSection = await Section.create({ sectionName });

        course.courseContent.push(newSection._id);
        await course.save();

        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            section: newSection,
            course,
        });
    } catch (error) {
        console.error("createSection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create section",
        });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Section ID and name are required",
            });
        }

        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true, runValidators: true }
        );

        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            section,
        });
    } catch (error) {
        console.error("updateSection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update section",
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const sectionId = req.params.sectionId || req.body.sectionId;

        const section = await Section.findByIdAndDelete(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        await Course.updateMany(
            { courseContent: section._id },
            { $pull: { courseContent: section._id } }
        );

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    } catch (error) {
        console.error("deleteSection:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete section",
        });
    }
};
