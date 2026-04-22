const mongoose = require("mongoose");
module.exports = mongoose.model("Profile", new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
}, { timestamps: true }));
