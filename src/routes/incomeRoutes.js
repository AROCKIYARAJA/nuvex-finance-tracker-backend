const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { INCOME_CATEGORIES } = require("../config/constants");
const { getIncomes, addIncome, deleteIncome } = require("../controllers/incomeController");

router.get("/", getIncomes);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("amount").isFloat({ min: 0.01 }).withMessage("Amount must be positive"),
    body("category").isIn(INCOME_CATEGORIES).withMessage("Invalid category"),
    body("notes").optional().isString(),
  ],
  validate,
  addIncome
);
router.delete("/:id", deleteIncome);

module.exports = router;
