const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor", "admin", "student", "instructor"],
        default: "Student",
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    image: { type: String, default: "" },
    token: { type: String, default: null },
    resetPassExpire: { type: Date },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    }],
});

module.exports = mongoose.model("User", userSchema);
