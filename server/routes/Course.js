const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getAllDetails,
    updateCourse,
    deleteCourse,
    changeCourseStatus,
} = require("../controller/Course");
const { createSection, updateSection, deleteSection } = require("../controller/Section");
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controller/SebSection");
const {
    createRating,
    getAverageRating,
    getAllrating,
} = require("../controller/RatingAndReview");
const { auth, isInstructor, isStudent } = require("../middleware/auth");

router.post("/create", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getAllDetails);
router.put("/updateCourse", auth, isInstructor, updateCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.put("/changeCourseStatus", auth, isInstructor, changeCourseStatus);

router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection/:sectionId", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection/:subSectionId", auth, isInstructor, deleteSubSection);

router.post("/createRating", auth, isStudent, createRating);
router.post("/getAverageRating", getAverageRating);
router.get("/getAllRatings", getAllrating);

module.exports = router;
