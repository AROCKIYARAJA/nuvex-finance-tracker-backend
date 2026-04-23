const Metal = require("../models/Metal");
const AssetWithdrawal = require("../models/AssetWithdrawal");

exports.getAll = async (req, res) => { try { res.json({ data: await Metal.find().sort({ createdAt: -1 }) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.create = async (req, res) => { try { res.status(201).json({ data: await Metal.create(req.body) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.remove = async (req, res) => { try { await Metal.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); } catch (e) { res.status(500).json({ error: e.message }); } };

exports.withdraw = async (req, res) => {
  try {
    const { name, quantity, pricePerGram, totalPrice, assetType, notes } = req.body;
    if (!quantity || !pricePerGram || !assetType) return res.status(400).json({ error: "quantity, pricePerGram, assetType required" });
    const entries = await Metal.find({ type: assetType }).sort({ createdAt: 1 });
    let remaining = quantity;
    for (const entry of entries) {
      if (remaining <= 0) break;
      if (entry.quantity <= remaining) { remaining -= entry.quantity; await Metal.findByIdAndDelete(entry._id); }
      else { entry.quantity -= remaining; remaining = 0; await entry.save(); }
    }
    if (remaining > 0) return res.status(400).json({ error: "Insufficient stock" });
    const withdrawal = await AssetWithdrawal.create({ name, quantity, pricePerGram, totalPrice: totalPrice || quantity * pricePerGram, assetType, notes });
    res.status(201).json({ data: withdrawal });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.getWithdrawals = async (req, res) => { try { res.json({ data: await AssetWithdrawal.find().sort({ createdAt: -1 }) }); } catch (e) { res.status(500).json({ error: e.message }); } };

exports.updatePrice = async (req, res) => {
  try {
    const { assetType, pricePerGram } = req.body;
    if (!assetType || !pricePerGram) return res.status(400).json({ error: "assetType and pricePerGram required" });
    const result = await Metal.updateMany({ type: assetType }, { $set: { buyingPrice: pricePerGram } });
    res.json({ data: { modified: result.modifiedCount } });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
