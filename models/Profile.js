const mongoose = require("mongoose");
const schema = new mongoose.Schema({ name: String, email: String }, { timestamps: true });
module.exports = mongoose.model("Profile", schema);
