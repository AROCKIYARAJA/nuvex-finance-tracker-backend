const r = require("express").Router(); const c = require("../controllers/networthController");
r.get("/", c.getAll); r.post("/", c.create); r.get("/snapshot", c.snapshot); r.delete("/:id", c.remove);
module.exports = r;
