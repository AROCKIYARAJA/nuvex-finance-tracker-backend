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

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

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
