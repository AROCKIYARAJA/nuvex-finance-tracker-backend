const Income = require("../models/Income");
exports.getAll = async (req, res) => { try { res.json({ data: await Income.find().sort({ createdAt: -1 }) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.create = async (req, res) => { try { res.status(201).json({ data: await Income.create(req.body) }); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.remove = async (req, res) => { try { await Income.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); } catch (e) { res.status(500).json({ error: e.message }); } };
