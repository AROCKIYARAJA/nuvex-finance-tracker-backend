const Settings = require("../models/Settings");
exports.get = async (req, res) => {
  try {
    let s = await Settings.findOne();
    if (!s) s = await Settings.create({});
    res.json({ data: s });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update = async (req, res) => {
  try {
    let s = await Settings.findOne();
    if (!s) s = await Settings.create(req.body);
    else { Object.assign(s, req.body); await s.save(); }
    res.json({ data: s });
  } catch (e) { res.status(500).json({ error: e.message }); }
};
