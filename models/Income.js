const mongoose = require("mongoose");
module.exports = mongoose.model("Income", new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  notes: { type: String, default: "" },
}, { timestamps: true }));
