const PF = require("../models/PF");
exports.getAll = async (req, res) => {
  try { res.json({ success: true, data: await PF.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json({ success: true, data: await PF.create(req.body) }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
exports.getTotal = async (req, res) => {
  try {
    const result = await PF.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$amount" } } }]);
    res.json({ success: true, data: { totalAmount: result[0]?.totalAmount || 0 } });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
