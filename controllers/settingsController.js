const Settings = require("../models/Settings");
exports.get = async (req, res) => {
  try {
    let s = await Settings.findOne();
    if (!s) s = await Settings.create({});
    res.json({ success: true, data: s });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.update = async (req, res) => {
  try {
    let s = await Settings.findOne();
    if (!s) s = await Settings.create(req.body);
    else { Object.assign(s, req.body); await s.save(); }
    res.json({ success: true, data: s });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
