const mongoose = require("mongoose");
const metalDetailSchema = new mongoose.Schema({
  grams: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  invested: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
}, { _id: false });

const fundDetailSchema = new mongoose.Schema({
  fundId: String,
  name: String,
  units: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  invested: { type: Number, default: 0 },
  returns: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
}, { _id: false });

module.exports = mongoose.model("Networth", new mongoose.Schema({
  date: { type: String, required: true },
  metals: {
    gold: metalDetailSchema,
    silver: metalDetailSchema,
  },
  funds: [fundDetailSchema],
  bankLiquidity: { type: Number, default: 0 },
  pfAmount: { type: Number, default: 0 },
  networth: { type: Number, default: 0 },
  growth: { type: Number, default: 0 },
}, { timestamps: true }));
