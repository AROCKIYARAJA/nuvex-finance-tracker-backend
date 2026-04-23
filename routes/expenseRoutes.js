const r = require("express").Router(); const c = require("../controllers/expenseController");
r.get("/", c.getAll); r.post("/", c.create); r.delete("/:id", c.remove); module.exports = r;
