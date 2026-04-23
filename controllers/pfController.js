const PF = require("../models/PF");
exports.getAll = async (req, res) => { try { res.json({ data: await PF.find().sort({ createdAt: -1 }) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.create = async (req, res) => { try { res.status(201).json({ data: await PF.create(req.body) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.getTotal = async (req, res) => {
  try {
    const result = await PF.aggregate([{ $group: { _id: null, totalAmount: { $sum: "$amount" } } }]);
    res.json({ data: { totalAmount: result[0]?.totalAmount || 0 } });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
