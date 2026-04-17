const mongoose = require("mongoose");
const { EXPENSE_CATEGORIES } = require("../config/constants");

const expenseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, enum: EXPENSE_CATEGORIES },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

expenseSchema.index({ category: 1 });
expenseSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Expense", expenseSchema);
