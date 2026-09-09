const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    timeDuration: String,
    videoUrl: String,
});

module.exports = mongoose.model("SubSection", subSectionSchema);
