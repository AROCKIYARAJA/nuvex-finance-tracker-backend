const mongoose = require("mongoose");
module.exports = mongoose.model("AssetWithdrawal", new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerGram: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  assetType: { type: String, enum: ["gold", "silver"], required: true },
  notes: { type: String, default: "" },
}, { timestamps: true }));
