const mongoose = require("mongoose");
const { METAL_TYPES } = require("../config/constants");

const metalSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: METAL_TYPES },
    quantity: { type: Number, required: true, min: 0 },
    buyingPrice: { type: Number, required: true, min: 0 },
    purchaseDate: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

metalSchema.index({ type: 1 });

module.exports = mongoose.model("Metal", metalSchema);
