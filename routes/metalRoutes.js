const router = require("express").Router();
const c = require("../controllers/metalController");
router.get("/", c.getAll);
router.post("/", c.create);
router.delete("/:id", c.remove);
router.post("/withdraw", c.withdraw);
router.get("/withdrawals", c.getWithdrawals);
router.put("/update-price", c.updatePrice);
module.exports = router;
