const Expense = require("../models/Expense");
const { asyncHandler } = require("../utils/asyncHandler");
const { success, created, deleted } = require("../utils/apiResponse");
const { PAGINATION } = require("../config/constants");

// GET /api/expenses
const getExpenses = asyncHandler(async (req, res) => {
  const {
    page = PAGINATION.DEFAULT_PAGE,
    limit = PAGINATION.DEFAULT_LIMIT,
    sort = "createdAt",
    order = "desc",
    category,
  } = req.query;

  const filter = {};
  if (category) filter.category = category;

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(Number(limit), PAGINATION.MAX_LIMIT);
  const sortObj = { [sort]: order === "asc" ? 1 : -1 };

  const [expenses, total] = await Promise.all([
    Expense.find(filter).sort(sortObj).skip((pageNum - 1) * limitNum).limit(limitNum),
    Expense.countDocuments(filter),
  ]);

  success(res, { expenses, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) });
});

// POST /api/expenses
const addExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create(req.body);
  created(res, expense, "Expense added");
});

// DELETE /api/expenses/:id
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);
  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }
  deleted(res, "Expense deleted");
});

module.exports = { getExpenses, addExpense, deleteExpense };
