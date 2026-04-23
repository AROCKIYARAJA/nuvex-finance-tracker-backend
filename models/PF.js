const mongoose = require("mongoose");
const schema = new mongoose.Schema({ name: String, amount: Number, notes: String }, { timestamps: true });
module.exports = mongoose.model("PF", schema);
