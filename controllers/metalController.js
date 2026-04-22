const Metal = require("../models/Metal");
const AssetWithdrawal = require("../models/AssetWithdrawal");

exports.getAll = async (req, res) => {
  try { res.json({ success: true, data: await Metal.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.create = async (req, res) => {
  try { res.status(201).json({ success: true, data: await Metal.create(req.body) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.remove = async (req, res) => {
  try { await Metal.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.withdraw = async (req, res) => {
  try {
    const { name, quantity, pricePerGram, totalPrice, assetType, notes } = req.body;
    let remaining = quantity;
    const entries = await Metal.find({ type: assetType }).sort({ createdAt: 1 });
    for (const entry of entries) {
      if (remaining <= 0) break;
      if (entry.quantity <= remaining) {
        remaining -= entry.quantity;
        await Metal.findByIdAndDelete(entry._id);
      } else {
        entry.quantity -= remaining;
        remaining = 0;
        await entry.save();
      }
    }
    if (remaining > 0) return res.status(400).json({ message: "Insufficient stock" });
    const withdrawal = await AssetWithdrawal.create({ name, quantity, pricePerGram, totalPrice, assetType, notes });
    res.status(201).json({ success: true, data: withdrawal });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getWithdrawals = async (req, res) => {
  try { res.json({ success: true, data: await AssetWithdrawal.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};

exports.updatePrice = async (req, res) => {
  try {
    const { assetType, pricePerGram } = req.body;
    await Metal.updateMany({ type: assetType }, { $set: { buyingPrice: pricePerGram } });
    res.json({ success: true, message: "Prices updated" });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
