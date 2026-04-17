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

const deleteAll = asyncHandler(async (_req,res) => {
  clearDataBase()
  success(res, { message: "successfully erased all data" })
})

module.exports = { getCashflowSummary, getInvestmentSummary, deleteAll };
