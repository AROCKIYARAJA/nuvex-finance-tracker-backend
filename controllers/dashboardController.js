const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");

exports.cashflow = async (req, res) => {
  try {
    const [expenses, incomes] = await Promise.all([Expense.find(), Income.find()]);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    res.json({ success: true, data: { totalIncome, totalExpenses, netFlow: totalIncome - totalExpenses, balance: totalIncome - totalExpenses, expenseCount: expenses.length, incomeCount: incomes.length } });
  } catch (e) { res.status(500).json({ message: e.message }); }
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
    res.json({ success: true, data: result });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.recentTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const [expenses, incomes] = await Promise.all([
      Expense.find().sort({ createdAt: -1 }).limit(limit),
      Income.find().sort({ createdAt: -1 }).limit(limit),
    ]);
    const all = [
      ...expenses.map(e => ({ id: e._id, type: "expense", name: e.name, amount: e.amount, category: e.category, notes: e.notes, createdAt: e.createdAt })),
      ...incomes.map(i => ({ id: i._id, type: "income", name: i.name, amount: i.amount, category: i.category, notes: i.notes, createdAt: i.createdAt })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
    res.json({ success: true, data: all });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.investments = async (req, res) => {
  try {
    const [metals, funds] = await Promise.all([Metal.find(), MutualFund.find()]);
    const metalValue = metals.reduce((s, m) => s + m.quantity * m.buyingPrice, 0);
    const fundsInvested = funds.reduce((s, f) => s + (f.investedAmount || 0), 0);
    const fundsValue = funds.reduce((s, f) => s + (f.currentValue || 0), 0);
    const totalInvested = metalValue + fundsInvested;
    const totalValue = metalValue + fundsValue;
    res.json({ success: true, data: { totalInvested, totalValue, estimatedReturns: totalValue - totalInvested, metalValue, fundsInvested, fundsValue, metalCount: metals.length, fundCount: funds.length } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
