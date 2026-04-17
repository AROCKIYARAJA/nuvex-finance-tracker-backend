# Nuvex Backend — Node.js / Express / MongoDB

## Folder Structure

```
nuvex-backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── constants.js       # Categories, enums, pagination
│   ├── controllers/
│   │   ├── profileController.js
│   │   ├── settingsController.js
│   │   ├── expenseController.js
│   │   ├── incomeController.js
│   │   ├── metalController.js
│   │   ├── mutualFundController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── errorHandler.js    # 404 + global error handler
│   │   └── validate.js        # express-validator middleware
│   ├── models/
│   │   ├── Profile.js
│   │   ├── Settings.js
│   │   ├── Expense.js
│   │   ├── Income.js
│   │   ├── Metal.js
│   │   └── MutualFund.js
│   ├── routes/
│   │   ├── profileRoutes.js
│   │   ├── settingsRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── incomeRoutes.js
│   │   ├── metalRoutes.js
│   │   ├── mutualFundRoutes.js
│   │   └── dashboardRoutes.js
│   ├── seeds/
│   │   └── seed.js            # Sample data seeder
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   └── apiResponse.js
│   └── server.js              # Express app entry
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

```bash
cd nuvex-backend
cp .env.example .env         # Edit MONGODB_URI if needed
npm install
npm run seed                 # Load sample data
npm run dev                  # Start with nodemon (http://localhost:5000)
```

## API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | /api/health               | Health check             |
| GET    | /api/profile              | Get user profile         |
| PUT    | /api/profile              | Update profile           |
| GET    | /api/settings             | Get app settings         |
| PUT    | /api/settings             | Update settings          |
| GET    | /api/expenses             | List expenses (paginated)|
| POST   | /api/expenses             | Add expense              |
| DELETE | /api/expenses/:id         | Delete expense           |
| GET    | /api/incomes              | List incomes (paginated) |
| POST   | /api/incomes              | Add income               |
| DELETE | /api/incomes/:id          | Delete income            |
| GET    | /api/metals               | List metal entries       |
| POST   | /api/metals               | Add metal entry          |
| DELETE | /api/metals/:id           | Delete metal entry       |
| GET    | /api/mutual-funds         | List mutual funds        |
| POST   | /api/mutual-funds         | Add mutual fund          |
| PUT    | /api/mutual-funds/:id     | Update mutual fund       |
| DELETE | /api/mutual-funds/:id     | Delete mutual fund       |
| GET    | /api/dashboard/cashflow   | Cashflow summary         |
| GET    | /api/dashboard/investments| Investment summary       |

### Query Parameters (expenses/incomes)
- `page` — page number (default 1)
- `limit` — items per page (default 20, max 100)
- `sort` — field to sort by (`createdAt`, `amount`, `name`)
- `order` — `asc` or `desc`
- `category` — filter by category

## Frontend Integration

Update your React frontend `service-api.ts` to call `http://localhost:5000/api/...` instead of localStorage. Set the `CORS_ORIGIN` env var to your frontend URL.
