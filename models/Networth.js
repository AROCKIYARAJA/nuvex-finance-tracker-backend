const mongoose = require("mongoose");
const metalSub = { grams: Number, percentage: Number, invested: Number, returns: Number, totalAmount: Number };
const fundSub = { fundId: String, name: String, units: Number, percentage: Number, invested: Number, returns: Number, totalAmount: Number };
const schema = new mongoose.Schema({
  date: String,
  metals: { gold: metalSub, silver: metalSub },
  funds: [fundSub],
  bankLiquidity: { type: Number, default: 0 },
  pfAmount: { type: Number, default: 0 },
  networth: { type: Number, default: 0 },
  growth: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model("Networth", schema);
