const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/assetWithdrawalController");

router.post("/withdraw", ctrl.withdrawAsset);
router.get("/withdrawals", ctrl.getWithdrawals);

module.exports = router;
