const mongoose = require("mongoose");

const connectMongo = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Database connected!");
    } catch (error) {
        console.error("❌ Error connecting DB:", error);
    }
};

module.exports = connectMongo;