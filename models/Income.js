const mongoose = require("mongoose");
const schema = new mongoose.Schema({ name: String, amount: Number, category: String, notes: String }, { timestamps: true });
module.exports = mongoose.model("Income", schema);
