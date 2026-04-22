const MutualFund = require("../models/MutualFund");
exports.getAll = async (req, res) => {
  try { res.json({ success: true, data: await MutualFund.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json({ success: true, data: await MutualFund.create(req.body) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.update = async (req, res) => {
  try {
    const fund = await MutualFund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fund) return res.status(404).json({ message: "Fund not found" });
    res.json({ success: true, data: fund });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.remove = async (req, res) => {
  try { await MutualFund.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
