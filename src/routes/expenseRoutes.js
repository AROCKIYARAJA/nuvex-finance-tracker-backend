const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { EXPENSE_CATEGORIES } = require("../config/constants");
const { getExpenses, addExpense, deleteExpense } = require("../controllers/expenseController");

router.get("/", getExpenses);
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("amount").isFloat({ min: 0.01 }).withMessage("Amount must be positive"),
    body("category").isIn(EXPENSE_CATEGORIES).withMessage("Invalid category"),
    body("notes").optional().isString(),
  ],
  validate,
  addExpense
);
router.delete("/:id", deleteExpense);

module.exports = router;
