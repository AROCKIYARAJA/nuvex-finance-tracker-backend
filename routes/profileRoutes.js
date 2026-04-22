const router = require("express").Router();
const c = require("../controllers/profileController");
router.get("/", c.get);
router.put("/", c.update);
module.exports = router;
