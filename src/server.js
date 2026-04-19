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
const assetsWithdrawRoutes = require("./routes/assetWithdrawalRoutes");

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
app.use("/api/reset-all", dashboardRoutes);
app.use("/api/metals", assetsWithdrawRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>API Health</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .card {
          background: #1e293b;
          padding: 30px 40px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .status {
          font-size: 24px;
          font-weight: bold;
          color: #22c55e;
        }
        .time {
          margin-top: 10px;
          font-size: 14px;
          color: #94a3b8;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="status">✅ API Health: Working Good</div>
        <div class="time">UTC Time: ${new Date().toISOString()}</div>
        <div class="time">Local Time: ${new Date()}</div>
      </div>
    </body>
    </html>
  `);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Nuvex API running on https://nuvex-finance-tracker-backend-production.up.railway.app/`);
  });
});
