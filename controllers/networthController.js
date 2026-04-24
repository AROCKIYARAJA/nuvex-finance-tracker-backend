const Networth = require("../models/Networth");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");
const PF = require("../models/PF");
const { cashflow } = require("./dashboardController");
const Expense = require("../models/Expense");
const Income = require("../models/Income");

exports.getAll = async (req, res) => {
  try { res.json({ data: await Networth.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.create = async (req, res) => {
  try {
    res.status(201).json({ data: await Networth.create(req.body) });
  }
  catch (e) { res.status(500).json({ error: e.message }); }
};

exports.snapshot = async (req, res) => {
  try {
    const metals = await Metal.find();
    const funds = await MutualFund.find();
    const pfAgg = await PF.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const pfTotal = pfAgg[0]?.total || 0;

    const goldEntries = metals.filter(m => m.type === "gold");
    const silverEntries = metals.filter(m => m.type === "silver");

    const goldGrams = goldEntries.reduce((s, m) => s + m.quantity, 0);
    const goldInvested = goldEntries.reduce((s, m) => s + (m.quantity * m.buyingPrice), 0);
    const silverGrams = silverEntries.reduce((s, m) => s + m.quantity, 0);
    const silverInvested = silverEntries.reduce((s, m) => s + (m.quantity * m.buyingPrice), 0);

    const fundSnapshots = funds.map(f => ({
      fundId: f._id.toString(),
      name: f.name,
      units: f.units || 0,
      percentage: f.percentage || 0,
      invested: f.investedAmount || 0,
      returns: f.returns || 0,
      totalAmount: f.currentValue || 0,
    }));

    const [expenses, incomes] = await Promise.all([Expense.find(), Income.find()]);
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const bankLiquidityAmount = totalIncome - totalExpenses
    const fundsTotal = fundSnapshots.reduce((s, f) => s + f.totalAmount, 0);
    const networth = goldInvested + silverInvested + fundsTotal + pfTotal + bankLiquidityAmount;
    const lastEntry = await Networth.find();
    const growth = lastEntry.length <= 1 ? 0 : lastEntry[lastEntry.length - 2].networth - lastEntry[lastEntry.length - 1].networth
    const snapshot = {
      date: new Date().toISOString(),
      metals: {
        gold: { grams: goldGrams, percentage: 0, invested: goldInvested, returns: 0, totalAmount: goldInvested },
        silver: { grams: silverGrams, percentage: 0, invested: silverInvested, returns: 0, totalAmount: silverInvested },
      },
      funds: fundSnapshots,
      bankLiquidity: bankLiquidityAmount,
      pfAmount: pfTotal,
      networth,
      growth,
    };

    res.json({ data: snapshot });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
