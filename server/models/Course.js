const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    instructor: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User", required: true },
          category: { type: mongoose.Schema.Types.ObjectId, 
          ref: "Category", required: true },
    whatYouWillLearn: String,
    courseContent: [{ type: mongoose.Schema.Types.ObjectId,
         ref: "Section" }],
    ratingAndReview: [{ type: mongoose.Schema.Types.ObjectId,
         ref: "RatingAndReview" }],
    price: { type: Number, required: true, min: 0 },
    thumbnail: String,
    createdAt: {
     type: Date,
     default: Date.now,
    },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId,
         ref: "User" }],
    status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
});

module.exports = mongoose.model("Course", courseSchema);
