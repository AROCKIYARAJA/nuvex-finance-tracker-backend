require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorHandler");

// Route imports
const profileRoutes = require("./routes/profileRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const metalRoutes = require("./routes/metalRoutes");
const mutualFundRoutes = require("./routes/mutualFundRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/metals", metalRoutes);
app.use("/api/mutual-funds", mutualFundRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reset-all", dashboardRoutes)

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Nuvex API running on http://localhost:${PORT}`);
//   });
// });

let isConnected = false;

const initDB = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

module.exports = async (req, res) => {
  await initDB();
  return app(req, res);
};
