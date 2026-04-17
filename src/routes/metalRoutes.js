const router = require("express").Router();
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { METAL_TYPES } = require("../config/constants");
const { getMetals, addMetal, deleteMetal } = require("../controllers/metalController");

router.get("/", getMetals);
router.post(
  "/",
  [
    body("type").isIn(METAL_TYPES).withMessage("Must be gold or silver"),
    body("quantity").isFloat({ min: 0.01 }).withMessage("Quantity must be positive"),
    body("buyingPrice").isFloat({ min: 0.01 }).withMessage("Price must be positive"),
    body("purchaseDate").notEmpty().withMessage("Purchase date required"),
    body("notes").optional().isString(),
  ],
  validate,
  addMetal
);
router.delete("/:id", deleteMetal);

module.exports = router;
