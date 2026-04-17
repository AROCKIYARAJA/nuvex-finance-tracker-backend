const Metal = require("../models/Metal");
const { asyncHandler } = require("../utils/asyncHandler");
const { success, created, deleted } = require("../utils/apiResponse");

const getMetals = asyncHandler(async (_req, res) => {
  const metals = await Metal.find().sort({ createdAt: -1 });
  success(res, metals);
});

const addMetal = asyncHandler(async (req, res) => {
  const metal = await Metal.create(req.body);
  created(res, metal, "Metal entry added");
});

const deleteMetal = asyncHandler(async (req, res) => {
  const metal = await Metal.findByIdAndDelete(req.params.id);
  if (!metal) {
    res.status(404);
    throw new Error("Metal entry not found");
  }
  deleted(res, "Metal entry deleted");
});

module.exports = { getMetals, addMetal, deleteMetal };
