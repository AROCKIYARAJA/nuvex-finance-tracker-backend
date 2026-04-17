const MutualFund = require("../models/MutualFund");
const { asyncHandler } = require("../utils/asyncHandler");
const { success, created, deleted } = require("../utils/apiResponse");

const getMutualFunds = asyncHandler(async (req, res) => {
  const { sort = "createdAt", order = "desc" } = req.query;
  const sortObj = { [sort]: order === "asc" ? 1 : -1 };
  const funds = await MutualFund.find().sort(sortObj);
  success(res, funds);
});

const addMutualFund = asyncHandler(async (req, res) => {
  const fund = await MutualFund.create(req.body);
  created(res, fund, "Mutual fund added");
});

const updateMutualFund = asyncHandler(async (req, res) => {
  const fund = await MutualFund.findById(req.params.id);
  if (!fund) {
    res.status(404);
    throw new Error("Fund not found");
  }
  const { name, sipAmount, investedAmount, currentValue, category, notes } = req.body;
  if (name !== undefined) fund.name = name;
  if (sipAmount !== undefined) fund.sipAmount = sipAmount;
  if (investedAmount !== undefined) fund.investedAmount = investedAmount;
  if (currentValue !== undefined) fund.currentValue = currentValue;
  if (category !== undefined) fund.category = category;
  if (notes !== undefined) fund.notes = notes;
  fund.lastUpdated = new Date();
  await fund.save();
  success(res, fund, "Mutual fund updated");
});

const deleteMutualFund = asyncHandler(async (req, res) => {
  const fund = await MutualFund.findByIdAndDelete(req.params.id);
  if (!fund) {
    res.status(404);
    throw new Error("Fund not found");
  }
  deleted(res, "Mutual fund deleted");
});

module.exports = { getMutualFunds, addMutualFund, updateMutualFund, deleteMutualFund };
