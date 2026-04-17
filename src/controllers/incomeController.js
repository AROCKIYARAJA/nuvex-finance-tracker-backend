const Income = require("../models/Income");
const { asyncHandler } = require("../utils/asyncHandler");
const { success, created, deleted } = require("../utils/apiResponse");
const { PAGINATION } = require("../config/constants");

const getIncomes = asyncHandler(async (req, res) => {
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

  const [incomes, total] = await Promise.all([
    Income.find(filter).sort(sortObj).skip((pageNum - 1) * limitNum).limit(limitNum),
    Income.countDocuments(filter),
  ]);

  success(res, { incomes, total, page: pageNum, limit: limitNum, pages: Math.ceil(total / limitNum) });
});

const addIncome = asyncHandler(async (req, res) => {
  const income = await Income.create(req.body);
  created(res, income, "Income added");
});

const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findByIdAndDelete(req.params.id);
  if (!income) {
    res.status(404);
    throw new Error("Income not found");
  }
  deleted(res, "Income deleted");
});

module.exports = { getIncomes, addIncome, deleteIncome };
