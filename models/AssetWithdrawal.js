const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  quantity: Number,
  pricePerGram: Number,
  totalPrice: Number,
  assetType: { type: String, enum: ["gold", "silver"] },
  notes: String,
}, { timestamps: true });
module.exports = mongoose.model("AssetWithdrawal", schema);
