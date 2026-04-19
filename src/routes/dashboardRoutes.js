const router = require("express").Router();
const { getCashflowSummary, getInvestmentSummary, deleteAll, getTopSpending,
    getRecentTransactions } = require("../controllers/dashboardController");

router.get("/cashflow", getCashflowSummary);
router.get("/investments", getInvestmentSummary);
router.get("/delete-all", deleteAll)
router.get("/top-spending", getTopSpending);
router.get("/recent-transactions", getRecentTransactions);
module.exports = router;