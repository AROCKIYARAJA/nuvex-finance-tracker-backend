const mongoose = require("mongoose");
const { CURRENCIES } = require("../config/constants");

const settingsSchema = new mongoose.Schema(
  {
    currency: { type: String, enum: CURRENCIES, default: "INR" },
    theme: { type: String, enum: ["dark", "light", "system"], default: "dark" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
