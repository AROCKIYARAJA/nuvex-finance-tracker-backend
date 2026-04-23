const r = require("express").Router(); const c = require("../controllers/pfController");
r.get("/", c.getAll); r.post("/", c.create); r.get("/total", c.getTotal);
module.exports = r;
