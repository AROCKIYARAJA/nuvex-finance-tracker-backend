const router = require("express").Router();
const c = require("../controllers/pfController");
router.get("/", c.getAll);
router.post("/", c.create);
router.get("/total", c.getTotal);
module.exports = router;
