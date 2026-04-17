const Settings = require("../models/Settings");
const { asyncHandler } = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");

const getSettings = asyncHandler(async (_req, res) => {
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  success(res, settings);
});

const updateSettings = asyncHandler(async (req, res) => {
  const { currency, theme } = req.body;
  let settings = await Settings.findOne();
  if (!settings) settings = await Settings.create({});
  if (currency !== undefined) settings.currency = currency;
  if (theme !== undefined) settings.theme = theme;
  await settings.save();
  success(res, settings, "Settings updated");
});

module.exports = { getSettings, updateSettings };
