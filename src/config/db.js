// require("dotenv").config();
require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("env ", process.env.MONGODB_URI)
    const conn = await mongoose.connect("mongodb+srv://admin:kk9jvkcmcq@arockiyaraja.6ottvpg.mongodb.net/?appName=arockiyaraja");
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
