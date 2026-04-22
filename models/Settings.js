const mongoose = require("mongoose");
module.exports = mongoose.model("Settings", new mongoose.Schema({
  currency: { type: String, default: "INR" },
  theme: { type: String, default: "dark" },
}, { timestamps: true }));
