const r = require("express").Router();
const mongoose = require("mongoose");
r.delete("/delete-all", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const c of collections) await mongoose.connection.db.collection(c.name).deleteMany({});
    res.json({ message: "All data deleted" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});
module.exports = r;
