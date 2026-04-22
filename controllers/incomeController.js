const Income = require("../models/Income");
exports.getAll = async (req, res) => {
  try { res.json({ success: true, data: await Income.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json({ success: true, data: await Income.create(req.body) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.remove = async (req, res) => {
  try { await Income.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
