const mongoose = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Rating, review and course ID are required",
            });
        }

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: userId,
        });

        if (!courseDetails) {
            return res.status(403).json({
                success: false,
                message: "Student is not enrolled in this course",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });

        if (alreadyReviewed) {
            return res.status(409).json({
                success: false,
                message: "You have already reviewed this course",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating: Number(rating),
            review,
            course: courseId,
            user: userId,
        });

        await Course.findByIdAndUpdate(courseId, {
            $push: { ratingAndReview: ratingReview._id },
        });

        return res.status(201).json({
            success: true,
            message: "Rating and review created successfully",
            data: ratingReview,
        });
    } catch (error) {
        console.error("createRating:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review",
        });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId || req.params.courseId;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const result = await RatingAndReview.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            averageRating: result.length ? result[0].averageRating : 0,
        });
    } catch (error) {
        console.error("getAverageRating:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get average rating",
        });
    }
};

exports.getAllrating = async (req, res) => {
    try {
        const allReview = await RatingAndReview.find({})
            .sort({ rating: -1 })
            .populate("user", "firstName lastName email image")
            .populate("course", "courseName");

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReview,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get all ratings",
        });
    }
};
