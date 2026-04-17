const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { getProfile, updateProfile } = require("../controllers/profileController");

router.get("/", getProfile);
router.put(
  "/",
  [body("name").optional().isString().trim(), body("email").optional().isEmail().withMessage("Invalid email")],
  validate,
  updateProfile
);

module.exports = router;
