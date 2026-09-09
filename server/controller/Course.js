const Course = require("../models/Course");
const Tag = require("../models/Tags");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

const {
    uploadImageToCloudinary,
} = require("../utils/imageuploader");


exports.createCourse = async (req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
        } = req.body;

        const thumbnail =
            req.files?.thumbnailImage ||
            req.files?.thumbnail;

        if (
            !courseName ||
            !courseDescription ||
            price === undefined ||
            price === null ||
            !tag ||
            !category ||
            !thumbnail
        ) {
            return res.status(400).json({
                success: false,
                message: "All course fields are required",
            });
        }

        const instructor = await User.findById(
            req.user.id
        );

        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        const tagDetails = await Tag.findById(tag);

        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }

        const categoryDetails =
            await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const thumbnailImage =
            await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructor._id,
            category: categoryDetails._id,
            whatYouWillLearn,
            price: Number(price),
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        await User.findByIdAndUpdate(
            instructor._id,
            {
                $addToSet: {
                    courses: newCourse._id,
                },
            }
        );

        await Category.findByIdAndUpdate(
            categoryDetails._id,
            {
                $addToSet: {
                    courses: newCourse._id,
                },
            }
        );

        await Tag.findByIdAndUpdate(
            tagDetails._id,
            {
                course: newCourse._id,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        console.error("createCourse:", error);

        return res.status(500).json({
            success: false,
            message: "Course creation failed",
            error: error.message,
        });
    }
};

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses =
            await Course.find({
                status: "Published",
            })
                .select(
                    "courseName courseDescription price thumbnail instructor ratingAndReview studentsEnrolled category tag status"
                )
                .populate(
                    "instructor",
                    "firstName lastName email image"
                )
                .populate("category", "name")
                .populate("tag", "name")
                .populate({
                    path: "ratingAndReview",
                    populate: {
                        path: "user",
                        select:
                            "firstName lastName image",
                    },
                });

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        console.error(
            "showAllCourses:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to load courses",
        });
    }
};

exports.getAllDetails = async (req, res) => {
    try {
        const courseId =
            req.body.courseId ||
            req.params.courseId;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const courseDetails =
            await Course.findById(courseId)
                // Instructor
                .populate({
                    path: "instructor",
                    select:
                        "firstName lastName email image",
                    populate: {
                        path: "additionalDetails",
                    },
                })

                // Category
                .populate("category")

                // Tag
                .populate("tag")

                // Reviews + reviewer details
                .populate({
                    path: "ratingAndReview",
                    populate: {
                        path: "user",
                        select:
                            "firstName lastName image",
                    },
                })

                // Sections + lectures
                .populate({
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        console.error(
            "getAllDetails:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch course details",
            error: error.message,
        });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const {
            courseId,
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
        } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        const course =
            await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (
            course.instructor.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this course",
            });
        }

        if (courseName) {
            course.courseName = courseName;
        }

        if (courseDescription) {
            course.courseDescription =
                courseDescription;
        }

        if (whatYouWillLearn) {
            course.whatYouWillLearn =
                whatYouWillLearn;
        }

        if (price !== undefined) {
            course.price = Number(price);
        }

        if (tag) {
            course.tag = tag;
        }

        if (category) {
            course.category = category;
        }

        const thumbnail =
            req.files?.thumbnailImage ||
            req.files?.thumbnail;

        if (thumbnail) {
            const uploaded =
                await uploadImageToCloudinary(
                    thumbnail,
                    process.env.FOLDER_NAME
                );

            course.thumbnail =
                uploaded.secure_url;
        }

        await course.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    } catch (error) {
        console.error(
            "updateCourse:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update course",
        });
    }
};


exports.deleteCourse = async (req, res) => {
    try {
        const courseId =
            req.body.courseId ||
            req.params.courseId;

        const course =
            await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (
            course.instructor.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to delete this course",
            });
        }

        await User.findByIdAndUpdate(
            course.instructor,
            {
                $pull: {
                    courses: course._id,
                },
            }
        );

        await User.updateMany(
            {
                _id: {
                    $in: course.studentsEnrolled,
                },
            },
            {
                $pull: {
                    courses: course._id,
                },
            }
        );

        await Category.findByIdAndUpdate(
            course.category,
            {
                $pull: {
                    courses: course._id,
                },
            }
        );

        for (const sectionId of course.courseContent) {
            const section =
                await Section.findById(sectionId);

            if (section) {
                await SubSection.deleteMany({
                    _id: {
                        $in: section.subSection,
                    },
                });
            }

            await Section.findByIdAndDelete(
                sectionId
            );
        }

        await Course.findByIdAndDelete(
            courseId
        );

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error(
            "deleteCourse:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete course",
        });
    }
};

exports.changeCourseStatus = async (req, res) => {
    try {
        const {
            courseId,
            status,
        } = req.body;

        if (
            !courseId ||
            !["Draft", "Published"].includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "A valid courseId and status (Draft or Published) are required",
            });
        }

        const course =
            await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        if (
            course.instructor.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this course",
            });
        }

        course.status = status;

        await course.save();

        return res.status(200).json({
            success: true,
            message: `Course marked as ${status}`,
            data: course,
        });
    } catch (error) {
        console.error(
            "changeCourseStatus:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update course status",
        });
    }
};
