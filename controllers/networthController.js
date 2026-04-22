const Networth = require("../models/Networth");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");
const PF = require("../models/PF");

exports.getAll = async (req, res) => {
  try { res.json({ success: true, data: await Networth.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try { res.status(201).json({ success: true, data: await Networth.create(req.body) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.snapshot = async (req, res) => {
  try {
    const metals = await Metal.find();
    const funds = await MutualFund.find();
    const pfResult = await PF.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const pfAmount = pfResult[0]?.total || 0;

    const goldEntries = metals.filter(m => m.type === "gold");
    const silverEntries = metals.filter(m => m.type === "silver");

    const goldGrams = goldEntries.reduce((s, m) => s + m.quantity, 0);
    const goldInvested = goldEntries.reduce((s, m) => s + m.quantity * m.buyingPrice, 0);
    const silverGrams = silverEntries.reduce((s, m) => s + m.quantity, 0);
    const silverInvested = silverEntries.reduce((s, m) => s + m.quantity * m.buyingPrice, 0);

    const goldData = { grams: goldGrams, percentage: 0, invested: goldInvested, returns: 0, totalAmount: goldInvested };
    const silverData = { grams: silverGrams, percentage: 0, invested: silverInvested, returns: 0, totalAmount: silverInvested };

    const fundsData = funds.map(f => ({
      fundId: f._id.toString(),
      name: f.name,
      units: f.units || 0,
      percentage: f.percentage || 0,
      invested: f.investedAmount || 0,
      returns: f.returns || 0,
      totalAmount: f.currentValue || 0,
    }));

    const fundsTotalValue = fundsData.reduce((s, f) => s + f.totalAmount, 0);
    const networth = goldInvested + silverInvested + fundsTotalValue + pfAmount;

    // Get last entry for growth calculation
    const lastEntry = await Networth.findOne().sort({ createdAt: -1 });
    const growth = lastEntry ? networth - (lastEntry.networth || 0) : 0;

    res.json({
      success: true,
      data: {
        date: new Date().toISOString(),
        metals: { gold: goldData, silver: silverData },
        funds: fundsData,
        bankLiquidity: 0,
        pfAmount,
        networth,
        growth,
      },
    });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
