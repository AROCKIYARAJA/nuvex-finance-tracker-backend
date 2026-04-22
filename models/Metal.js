const mongoose = require("mongoose");
module.exports = mongoose.model("Metal", new mongoose.Schema({
  type: { type: String, enum: ["gold", "silver"], required: true },
  quantity: { type: Number, required: true },
  buyingPrice: { type: Number, required: true },
  purchaseDate: { type: String, required: true },
  notes: { type: String, default: "" },
}, { timestamps: true }));
