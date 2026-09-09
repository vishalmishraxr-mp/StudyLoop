const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: String,
    dateOfBirth: String,
    about: { type: String, trim: true },
    contactNumber: String,
});

module.exports = mongoose.model("Profile", profileSchema);
