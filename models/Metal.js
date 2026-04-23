const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  type: { type: String, enum: ["gold", "silver"], required: true },
  quantity: { type: Number, required: true },
  buyingPrice: { type: Number, required: true },
  purchaseDate: String,
  notes: String,
}, { timestamps: true });
module.exports = mongoose.model("Metal", schema);
