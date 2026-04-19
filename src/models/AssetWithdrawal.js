// models/AssetWithdrawal.js
const mongoose = require("mongoose");

const assetWithdrawalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    quantity: { type: Number, required: true, min: 0.01 },
    pricePerGram: { type: Number, required: true, min: 0.01 },
    totalPrice: { type: Number, required: true, min: 0 },
    assetType: { type: String, required: true, enum: ["gold", "silver"] },
    notes: { type: String, default: "", maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetWithdrawal", assetWithdrawalSchema);
