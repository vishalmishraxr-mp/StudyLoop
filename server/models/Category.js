const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Category", categorySchema);
