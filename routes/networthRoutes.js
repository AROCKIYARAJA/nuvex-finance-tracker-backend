const router = require("express").Router();
const c = require("../controllers/networthController");
router.get("/", c.getAll);
router.post("/", c.create);
router.get("/snapshot", c.snapshot);
module.exports = router;
