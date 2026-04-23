const r = require("express").Router(); const c = require("../controllers/metalController");
r.get("/", c.getAll); r.post("/", c.create); r.delete("/:id", c.remove);
r.post("/withdraw", c.withdraw); r.get("/withdrawals", c.getWithdrawals); r.put("/update-price", c.updatePrice);
module.exports = r;
