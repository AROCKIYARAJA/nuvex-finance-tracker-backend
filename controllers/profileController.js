const Profile = require("../models/Profile");
exports.get = async (req, res) => {
  try {
    let p = await Profile.findOne();
    if (!p) p = await Profile.create({ name: "", email: "" });
    res.json({ success: true, data: p });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
exports.update = async (req, res) => {
  try {
    let p = await Profile.findOne();
    if (!p) p = await Profile.create(req.body);
    else { Object.assign(p, req.body); await p.save(); }
    res.json({ success: true, data: p });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
