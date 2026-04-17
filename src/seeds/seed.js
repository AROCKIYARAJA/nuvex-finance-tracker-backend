const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Profile = require("../models/Profile");
const Settings = require("../models/Settings");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const Metal = require("../models/Metal");
const MutualFund = require("../models/MutualFund");

const seed = async () => {
  await connectDB();

  // Clear existing data
  await Promise.all([
    Profile.deleteMany(),
    Settings.deleteMany(),
    Expense.deleteMany(),
    Income.deleteMany(),
    Metal.deleteMany(),
    MutualFund.deleteMany(),
  ]);

  // Profile & settings
  await Profile.create({ name: "Nuvex User", email: "user@nuvex.app" });
  await Settings.create({ currency: "INR", theme: "dark" });

  // Expenses
  await Expense.insertMany([
    { name: "Groceries", amount: 1500, category: "food", notes: "Weekly groceries" },
    { name: "Netflix", amount: 649, category: "ott", notes: "Monthly subscription" },
    { name: "Uber Ride", amount: 320, category: "travel", notes: "Office commute" },
    { name: "Gym Membership", amount: 2000, category: "gym", notes: "Monthly gym fee" },
    { name: "Electricity Bill", amount: 1800, category: "bills", notes: "April bill" },
  ]);

  // Incomes
  await Income.insertMany([
    { name: "April Salary", amount: 85000, category: "salary", notes: "Monthly salary credit" },
    { name: "Freelance Project", amount: 15000, category: "freelance", notes: "UI design project" },
  ]);

  // Metals
  await Metal.insertMany([
    { type: "gold", quantity: 10, buyingPrice: 7200, purchaseDate: "2026-03-15", notes: "Digital gold" },
    { type: "silver", quantity: 100, buyingPrice: 85, purchaseDate: "2026-02-20", notes: "Silver investment" },
  ]);

  // Mutual Funds
  await MutualFund.insertMany([
    { name: "Axis Bluechip Fund", sipAmount: 5000, investedAmount: 60000, currentValue: 68500, category: "Large Cap", notes: "Long term" },
    { name: "Mirae Asset Emerging", sipAmount: 3000, investedAmount: 36000, currentValue: 42100, category: "Mid Cap", notes: "Medium risk" },
  ]);

  console.log("✅ Database seeded successfully!");
  process.exit(0);
};


const clearDataBase = async () => {
  await Promise.all([
    Settings.deleteMany(),
    Expense.deleteMany(),
    Income.deleteMany(),
    Metal.deleteMany(),
    MutualFund.deleteMany(),
  ]);
}

module.exports = { clearDataBase }