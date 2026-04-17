module.exports = {
  EXPENSE_CATEGORIES: [
    "food", "vegetables", "haircut", "orders", "gym", "fun", "ott", "travel",
    "recharge", "medical", "shopping", "bills", "fuel", "study", "lend",
    "rent", "emi", "gifts", "family", "pets", "maintenance", "insurance",
    "charity", "personal_care", "electronics",
  ],

  INCOME_CATEGORIES: [
    "salary", "freelance", "business", "refund", "gift_received",
    "interest", "dividend", "rental_income", "bonus", "other",
  ],

  METAL_TYPES: ["gold", "silver"],

  FUND_CATEGORIES: [
    "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "ELSS",
    "Debt", "Hybrid", "Index Fund", "Sectoral", "International",
  ],

  CURRENCIES: ["INR", "USD", "EUR", "GBP", "AED", "SGD", "CAD", "AUD", "JPY", "CNY"],

  SORT_FIELDS: ["createdAt", "amount", "name"],
  SORT_ORDERS: ["asc", "desc"],

  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
};
