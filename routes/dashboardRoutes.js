const r = require("express").Router();
const c = require("../controllers/dashboardController");
r.get("/cashflow", c.cashflow);
r.get("/top-spending", c.topSpending);
r.get("/recent-transactions", c.recentTransactions);
r.get("/investments", c.investments);
module.exports = r;
