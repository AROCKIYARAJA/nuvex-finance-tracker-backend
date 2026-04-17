const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { FUND_CATEGORIES } = require("../config/constants");
const { getMutualFunds, addMutualFund, updateMutualFund, deleteMutualFund } = require("../controllers/mutualFundController");

router.get("/", getMutualFunds);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Fund name required").trim(),
    body("sipAmount").isFloat({ min: 0 }).withMessage("SIP must be non-negative"),
    body("investedAmount").optional().isFloat({ min: 0 }),
    body("currentValue").optional().isFloat({ min: 0 }),
    body("category").isIn(FUND_CATEGORIES).withMessage("Invalid fund category"),
    body("notes").optional().isString(),
  ],
  validate,
  addMutualFund
);
router.put(
  "/:id",
  [
    body("name").optional().isString().trim(),
    body("sipAmount").optional().isFloat({ min: 0 }),
    body("investedAmount").optional().isFloat({ min: 0 }),
    body("currentValue").optional().isFloat({ min: 0 }),
    body("category").optional().isIn(FUND_CATEGORIES),
    body("notes").optional().isString(),
  ],
  validate,
  updateMutualFund
);
router.delete("/:id", deleteMutualFund);

module.exports = router;
