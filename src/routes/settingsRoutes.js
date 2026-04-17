const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { CURRENCIES } = require("../config/constants");
const { getSettings, updateSettings } = require("../controllers/settingsController");

router.get("/", getSettings);
router.put(
  "/",
  [
    body("currency").optional().isIn(CURRENCIES),
    body("theme").optional().isIn(["dark", "light", "system"]),
  ],
  validate,
  updateSettings
);

module.exports = router;
