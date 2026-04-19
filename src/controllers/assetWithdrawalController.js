// controllers/assetWithdrawalController.js
const AssetWithdrawal = require("../models/AssetWithdrawal");
const Metal = require("../models/Metal"); // existing model

// Helper: send standard response
const ok = (res, data, status = 200) =>
  res.status(status).json({ success: true, data });
const fail = (res, message, status = 400) =>
  res.status(status).json({ success: false, message });

// POST /api/metals/withdraw
// Body: { name, quantity, pricePerGram, totalPrice, assetType, notes }
exports.withdrawAsset = async (req, res) => {
  try {
    const { name, quantity, pricePerGram, totalPrice, assetType, notes } = req.body || {};

    // ---- Validation ----
    if (!name || typeof name !== "string" || !name.trim())
      return fail(res, "Name is required");
    if (name.trim().length > 100)
      return fail(res, "Name must be under 100 characters");
    if (quantity == null || isNaN(+quantity) || +quantity < 0.01)
      return fail(res, "Valid quantity is required");
    if (pricePerGram == null || isNaN(+pricePerGram) || +pricePerGram < 0.01)
      return fail(res, "Valid price per gram is required");
    if (!["gold", "silver"].includes(assetType))
      return fail(res, "assetType must be 'gold' or 'silver'");
    if (notes && String(notes).length > 500)
      return fail(res, "Notes must be under 500 characters");

    const qty = +quantity;
    const ppg = +pricePerGram;
    const computedTotal = +(qty * ppg).toFixed(2);
    const finalTotal =
      totalPrice != null && !isNaN(+totalPrice) ? +totalPrice : computedTotal;

    // ---- Stock check (sum of all holdings of this type) ----
    const holdings = await Metal.find({ type: assetType });
    const availableQty = holdings.reduce((s, m) => s + (m.quantity || 0), 0);
    if (qty > availableQty) {
      return fail(
        res,
        `Insufficient ${assetType} stock. Available: ${availableQty}g, requested: ${qty}g`
      );
    }

    // ---- Deduct from holdings (FIFO by purchaseDate / createdAt) ----
    const sorted = holdings.sort((a, b) => {
      const da = new Date(a.purchaseDate || a.createdAt).getTime();
      const db = new Date(b.purchaseDate || b.createdAt).getTime();
      return da - db;
    });

    let remaining = qty;
    for (const entry of sorted) {
      if (remaining <= 0) break;
      if (entry.quantity <= remaining) {
        remaining -= entry.quantity;
        await Metal.findByIdAndDelete(entry._id);
      } else {
        entry.quantity = +(entry.quantity - remaining).toFixed(4);
        remaining = 0;
        await entry.save();
      }
    }

    // ---- Save withdrawal record ----
    const withdrawal = await AssetWithdrawal.create({
      name: name.trim(),
      quantity: qty,
      pricePerGram: ppg,
      totalPrice: finalTotal,
      assetType,
      notes: (notes || "").trim(),
    });

    return ok(res, withdrawal, 201);
  } catch (err) {
    console.error("withdrawAsset error:", err);
    return fail(res, err.message || "Failed to withdraw asset", 500);
  }
};

// GET /api/metals/withdrawals
exports.getWithdrawals = async (_req, res) => {
  try {
    const list = await AssetWithdrawal.find().sort({ createdAt: -1 });
    return ok(res, list);
  } catch (err) {
    return fail(res, err.message || "Failed to fetch withdrawals", 500);
  }
};
