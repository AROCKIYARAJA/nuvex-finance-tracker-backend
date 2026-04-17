const router = require("express").Router();
const { getCashflowSummary, getInvestmentSummary, deleteAll } = require("../controllers/dashboardController");

router.get("/cashflow", getCashflowSummary);
router.get("/investments", getInvestmentSummary);
router.get("/delete-all", deleteAll)
module.exports = router;
