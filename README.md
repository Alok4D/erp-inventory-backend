# Mini ERP — Backend API

This is the backend for the **Mini ERP – Inventory & Sales Management System**. It provides a robust RESTful API built with Node.js, Express, TypeScript, and MongoDB.

## 🔗 Live Links
- **Frontend**: https://smart-erp-dashboard.vercel.app


## 🔑 Admin Login Credentials
| Field | Value |
|-------|-------|
| Email | `admin@gmail.com` |
| Password | `123456` |

## ✨ Features Implemented

### 1. Authentication & Security
- **JWT-Based Auth**: Secure login mechanism generating short-lived Access Tokens and long-lived Refresh Tokens.
- **Password Hashing**: Uses `bcrypt` with salt rounds to securely hash user passwords before saving them to the database.

### 2. Advanced Role-Based Access Control (RBAC)
- **Dynamic Roles**: Roles (Admin, Manager, Employee) and their permissions are stored dynamically in the database, not hardcoded.
- **Granular Permissions Middleware**: API routes are protected by a custom `auth()` middleware that validates if the logged-in user's role contains the required permissions (e.g., `create_product`, `view_sales`).

### 3. Product Management
- **Full CRUD API**: Create, Read, Update, and Delete operations for products.
- **Image Upload Integration**: Built-in support for uploading product images (prepared for `multer` and `Cloudinary`).
- **Generic Query Builder**: Powerful backend querying allowing Search (by name/SKU), Filtering, Sorting, and Pagination right out of the box.

### 4. Sales Management & Inventory Sync
- **Process Sales**: An endpoint that accepts a list of items and quantities.
- **Automatic Stock Deduction**: As soon as a sale is created, the system mathematically calculates and deducts the exact quantities from the products' available stock in the database.
- **Transactions & Rollbacks**: (Where applicable) Ensures that sales do not process if the requested quantity exceeds available stock.

### 5. Dashboard & Analytics
- **Live Statistics**: Single endpoint returning aggregated data: Total Revenue, Total Products, Total Sales, and an array of Low Stock Products.

### 6. Architecture & Best Practices
- **Modular Pattern**: Code is organized into clean domains (e.g., `modules/product`, `modules/sale`) separating Routes, Controllers, Services, and Interfaces.
- **Global Error Handling**: A centralized error handling middleware that parses Mongoose validation errors, Zod errors, and custom API errors into a standardized, readable JSON response.
- **Schema Validation**: Uses `Zod` to strongly validate incoming request bodies (e.g., ensuring prices are positive numbers).

### 7. Real-Time WebSockets
- **Socket.io Integration**: Live WebSocket server that broadcasts events (e.g., `new_sale`) globally to instantly sync connected clients without HTTP polling.

## 🛠️ Tech Stack
- **Node.js & Express.js**
- **TypeScript**
- **MongoDB & Mongoose**
- **Socket.io** (WebSockets)
- **Zod** (Validation)
- **JSON Web Tokens (JWT)**
- **Bcrypt**

---

## 🚀 Project Setup & Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Atlas cluster or local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/Alok4D/erp-inventory-backend.git
cd erp-inventory-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
PORT=5000
NODE_ENV=development

# MongoDB Connection String
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.../mini-erp?retryWrites=true&w=majority

BCRYPT_SALT_ROUNDS=12

# JWT Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

# Cloudinary (Optional, if you test image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the application
**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm run start
```
The server will start on `http://localhost:5000`.

---

## 📚 API Documentation

A complete **Postman Collection** is included in the root directory: `Mini-ERP.postman_collection.json`. You can import this directly into Postman to test all endpoints. 

### Key Endpoints Overview:

**Auth Endpoints:**
- `POST /api/v1/auth/login` (Login)
- `POST /api/v1/auth/refresh-token` (Refresh Session)
- `POST /api/v1/auth/change-password` (Update Password)

**Dashboard Endpoints:**
- `GET /api/v1/dashboard/summary` (Get Stats & Low Stock)

**Product Endpoints:**
- `GET /api/v1/products` (Accepts `?searchTerm=`, `?page=`, `?limit=`)
- `POST /api/v1/products` (Requires auth)
- `PATCH /api/v1/products/:id` (Requires auth)
- `DELETE /api/v1/products/:id` (Requires auth)

**Sales Endpoints:**
- `GET /api/v1/sales` (Accepts pagination)
- `POST /api/v1/sales` (Process a sale & deduct stock)
- `DELETE /api/v1/sales/:id`

**Role Endpoints:**
- `GET /api/v1/roles` (List all dynamic roles)
- `POST /api/v1/roles` (Create role with permissions array)
- `PATCH /api/v1/roles/:id` 
- `DELETE /api/v1/roles/:id`
