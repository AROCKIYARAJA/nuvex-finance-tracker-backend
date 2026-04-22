const mongoose = require("mongoose");
module.exports = mongoose.model("MutualFund", new mongoose.Schema({
  name: { type: String, required: true },
  sipAmount: { type: Number, default: 0 },
  units: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  investedAmount: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  currentValue: { type: Number, default: 0 },
  category: { type: String, default: "General" },
  notes: { type: String, default: "" },
  lastUpdated: { type: String, default: "" },
}, { timestamps: true }));
