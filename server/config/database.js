const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};
