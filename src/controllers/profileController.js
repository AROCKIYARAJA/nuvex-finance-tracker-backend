const Profile = require("../models/Profile");
const { asyncHandler } = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");

// GET /api/profile
const getProfile = asyncHandler(async (_req, res) => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({ name: "", email: "" });
  success(res, profile);
});

// PUT /api/profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({ name: "", email: "" });
  if (name !== undefined) profile.name = name;
  if (email !== undefined) profile.email = email;
  await profile.save();
  success(res, profile, "Profile updated");
});

module.exports = { getProfile, updateProfile };
