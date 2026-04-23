const mongoose = require("mongoose");
const schema = new mongoose.Schema({ currency: { type: String, default: "INR" }, theme: { type: String, default: "dark" } }, { timestamps: true });
module.exports = mongoose.model("Settings", schema);
