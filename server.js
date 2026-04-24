require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/expenses", require("./routes/expenseRoutes"));
app.use("/api/incomes", require("./routes/incomeRoutes"));
app.use("/api/metals", require("./routes/metalRoutes"));
app.use("/api/mutual-funds", require("./routes/mutualFundRoutes"));
app.use("/api/pf", require("./routes/pfRoutes"));
app.use("/api/networth", require("./routes/networthRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/reset-all", require("./routes/resetRoutes"));
app.get("/", (_req, res) => {
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
        <div class="time">Time: ${new Date().toLocaleString()}</div>
      </div>
    </body>
    </html>
  `);
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Nuvex API running on https://nuvex-finance-tracker-backend.vercel.app`)
    );
  })
  .catch((err) => { console.error("DB connection error:", err); process.exit(1); });
