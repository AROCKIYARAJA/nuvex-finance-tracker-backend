const mongoose = require("mongoose");
module.exports = mongoose.model("PF", new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  notes: { type: String, default: "" },
}, { timestamps: true }));
