const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");

exports.cashflow = async (req, res) => {
  try {
    const [expenses, incomes] = await Promise.all([Expense.find(), Income.find()]);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    res.json({ data: { totalIncome, totalExpenses, netFlow: totalIncome - totalExpenses, balance: totalIncome - totalExpenses, expenseCount: expenses.length, incomeCount: incomes.length } });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.topSpending = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const result = await Expense.aggregate([
      { $group: { _id: "$category", amount: { $sum: "$amount" } } },
      { $sort: { amount: -1 } },
      { $limit: limit },
      { $project: { _id: 0, category: "$_id", amount: 1 } },
    ]);
    res.json({ data: result });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.recentTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const [expenses, incomes] = await Promise.all([
      Expense.find().sort({ createdAt: -1 }).limit(limit).lean(),
      Income.find().sort({ createdAt: -1 }).limit(limit).lean(),
    ]);
    const all = [
      ...expenses.map(e => ({ ...e, id: e._id.toString(), type: "expense" })),
      ...incomes.map(i => ({ ...i, id: i._id.toString(), type: "income" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
    res.json({ data: all });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.investments = async (req, res) => {
  try {
    const [metals, funds] = await Promise.all([Metal.find(), MutualFund.find()]);
    const metalValue = metals.reduce((s, m) => s + (m.quantity * m.buyingPrice), 0);
    const fundsInvested = funds.reduce((s, f) => s + (f.investedAmount || 0), 0);
    const fundsValue = funds.reduce((s, f) => s + (f.currentValue || 0), 0);
    res.json({ data: { totalInvested: metalValue + fundsInvested, totalValue: metalValue + fundsValue, estimatedReturns: fundsValue - fundsInvested, metalValue, fundsInvested, fundsValue, metalCount: metals.length, fundCount: funds.length } });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
