const router = require("express").Router();
const c = require("../controllers/dashboardController");
router.get("/cashflow", c.cashflow);
router.get("/top-spending", c.topSpending);
router.get("/recent-transactions", c.recentTransactions);
router.get("/investments", c.investments);
module.exports = router;
