# Mini ERP - Backend

This is the backend API for the Mini ERP system built with **Node.js, Express, TypeScript, and Mongoose**. It follows a **Modular Feature-Based Architecture** ensuring scalability and maintainability.

## 🚀 Features

- **Modular Architecture**: Clean separation of concerns (User, Auth, Product, Sales).
- **Authentication**: JWT-based authentication (Access & Refresh tokens).
- **Authorization**: Role-based access control (Admin, Manager, Employee).
- **Validation**: Zod schema validation for all requests.
- **Error Handling**: Global error handler mapping custom errors to readable formats.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Security**: bcrypt, jsonwebtoken, cors

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository
   ```bash
   git clone <repo_url>
   cd erp-inventory-backend
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

3. Environment Variables
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/mini-erp
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   JWT_ACCESS_EXPIRES_IN=1d
   JWT_REFRESH_EXPIRES_IN=365d
   ```

4. Run the Development Server
   ```bash
   npm run dev
   ```

The server should now be running on `http://localhost:5000`.

## 📁 Project Structure

```text
src/
├── app/
│   ├── config/              # Environment configs
│   ├── errors/              # Custom App Errors
│   ├── interface/           # Global interfaces
│   ├── middlewares/         # authGuard, validateRequest, globalErrorHandler
│   ├── modules/
│   │   ├── Auth/            # Login, Token APIs
│   │   ├── user/            # User schema & creation
│   ├── routes/              # Central index for all routes
│   └── utils/               # catchAsync, sendResponse helpers
├── app.ts                   # Express app instance
└── server.ts                # Entry point
```
