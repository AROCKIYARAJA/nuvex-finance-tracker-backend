const mongoose = require("mongoose");
const { INCOME_CATEGORIES } = require("../config/constants");

const incomeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: INCOME_CATEGORIES },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

incomeSchema.index({ category: 1 });
incomeSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Income", incomeSchema);
