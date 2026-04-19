const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");
const { asyncHandler } = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");
const { clearDataBase } = require("../seeds/seed");

// GET /api/dashboard/cashflow
const getCashflowSummary = asyncHandler(async (_req, res) => {
  const [expenses, incomes] = await Promise.all([Expense.find(), Income.find()]);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

  // Category breakdown
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  success(res, {
    totalIncome,
    totalExpenses,
    netFlow: totalIncome - totalExpenses,
    balance: totalIncome - totalExpenses,
    expenseCount: expenses.length,
    incomeCount: incomes.length,
    categoryBreakdown: categoryMap,
  });
});

// GET /api/dashboard/investments
const getInvestmentSummary = asyncHandler(async (_req, res) => {
  const [metals, funds] = await Promise.all([Metal.find(), MutualFund.find()]);

  const metalValue = metals.reduce((sum, m) => sum + m.quantity * m.buyingPrice, 0);
  const fundsInvested = funds.reduce((sum, f) => sum + f.investedAmount, 0);
  const fundsValue = funds.reduce((sum, f) => sum + f.currentValue, 0);

  success(res, {
    totalInvested: metalValue + fundsInvested,
    totalValue: metalValue + fundsValue,
    estimatedReturns: fundsValue - fundsInvested,
    metalValue,
    fundsInvested,
    fundsValue,
    metalCount: metals.length,
    fundCount: funds.length,
  });
});

const getTopSpending = asyncHandler(async (req, res) => {
  const limit = Math.max(1, Math.min(parseInt(req.query.limit, 10) || 3, 20));

  const rows = await Expense.aggregate([
    {
      $group: {
        _id: "$category",
        amount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { amount: -1 } },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        category: "$_id",
        amount: 1,
        count: 1,
      },
    },
  ]);

  return success(res, rows);
});

const getRecentTransactions = asyncHandler(async (req, res) => {
  const limit = Math.max(1, Math.min(parseInt(req.query.limit, 10) || 5, 50));

  // Fetch up to `limit` of each, then merge & trim. Cheap for small N.
  const [expenses, incomes] = await Promise.all([
    Expense.find().sort({ createdAt: -1 }).limit(limit).lean(),
    Income.find().sort({ createdAt: -1 }).limit(limit).lean(),
  ]);

  const merged = [
    ...expenses.map((e) => ({
      id: String(e._id),
      type: "expense",
      name: e.name,
      amount: e.amount,
      category: e.category,
      notes: e.notes || "",
      createdAt: e.createdAt,
    })),
    ...incomes.map((i) => ({
      id: String(i._id),
      type: "income",
      name: i.name,
      amount: i.amount,
      category: i.category,
      notes: i.notes || "",
      createdAt: i.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  return success(res, merged);
});

const deleteAll = asyncHandler(async (_req, res) => {
  clearDataBase()
  success(res, { success: true, message: "successfully erased all data" })
})

module.exports = {
  getCashflowSummary, getInvestmentSummary, deleteAll, getTopSpending,
  getRecentTransactions,
};
