const mongoose = require("mongoose");
const { FUND_CATEGORIES } = require("../config/constants");

const mutualFundSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sipAmount: { type: Number, required: true, min: 0 },
    investedAmount: { type: Number, default: 0, min: 0 },
    currentValue: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true, enum: FUND_CATEGORIES },
    notes: { type: String, default: "" },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MutualFund", mutualFundSchema);
