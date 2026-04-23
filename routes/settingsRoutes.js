const r = require("express").Router(); const c = require("../controllers/settingsController");
r.get("/", c.get); r.put("/", c.update); module.exports = r;
