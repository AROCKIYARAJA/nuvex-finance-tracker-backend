const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String, sipAmount: Number, units: Number, percentage: Number,
  investedAmount: Number, returns: Number, currentValue: Number,
  category: String, notes: String, lastUpdated: String,
}, { timestamps: true });
module.exports = mongoose.model("MutualFund", schema);
