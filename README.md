# Mini ERP — Backend API

This is the backend for the **Mini ERP – Inventory & Sales Management System**. It provides a robust RESTful API built with Node.js, Express, TypeScript, and MongoDB.

## 🔗 Live Links
- **Live Backend API**: *(Add your Render URL here after deploy)*
- **Frontend**: https://smart-erp-dashboard.vercel.app
- **Frontend GitHub**: https://github.com/Alok4D/erp-inventory-frontend
- **Backend GitHub**: https://github.com/Alok4D/erp-inventory-backend

## 🛠️ Tech Stack
| Technology | Purpose |
|------------|---------|
| Node.js & Express.js | REST API Framework |
| TypeScript | Type-safe JavaScript |
| MongoDB & Mongoose | Database & ODM |
| Zod | Schema Validation |
| JWT | Authentication & Authorization |
| Cloudinary & Multer | Image Upload & Storage |
| Socket.io | Real-time WebSocket Events |
| Bcrypt | Password Hashing |

## ✨ Features
- **JWT Authentication**: Secure login with access & refresh token support.
- **Role-Based Access Control (RBAC)**: Dynamic, database-driven roles and granular permission management.
- **Product Management**: Full CRUD with image upload via Cloudinary.
- **Sales Management**: Process multi-item sales with automatic stock deduction.
- **Dashboard API**: Real-time statistics — total products, revenue, low-stock alerts.
- **Real-Time Updates**: Socket.io emits `new_sale` events to connected clients.
- **Generic QueryBuilder**: Advanced querying — search, filter, sort, paginate.
- **Global Error Handling**: Centralized, standardized error responses.

## 🔑 Admin Login Credentials
| Field | Value |
|-------|-------|
| Email | `admin@erp.com` |
| Password | `password123` |

## 📋 Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas (or local MongoDB)

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Alok4D/erp-inventory-backend.git
cd erp-inventory-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development

DATABASE_URL=your_mongodb_connection_string

BCRYPT_SALT_ROUNDS=12

JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d

# Cloudinary (for image uploads)
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

## 📚 API Documentation

### Base URL
```
https://<your-backend-url>/api/v1
```

### Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

### 🔐 Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Login and get JWT tokens | No |
| POST | `/auth/logout` | Logout user | No |
| POST | `/auth/refresh-token` | Get new access token | No |
| POST | `/auth/change-password` | Change user password | Yes |

**Login Request Body:**
```json
{
  "email": "admin@erp.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJ..."
  }
}
```

---

### 👥 User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/create-user` | Create a new user | No |
| GET | `/users/me` | Get logged-in user info | Yes |

**Create User Request Body:**
```json
{
  "password": "password123",
  "user": {
    "name": "Admin User",
    "email": "admin@erp.com",
    "role": "admin"
  }
}
```

---

### 📦 Product Routes

| Method | Endpoint | Description | Auth Required | Permission |
|--------|----------|-------------|---------------|------------|
| GET | `/products` | Get all products (with search & pagination) | Yes | `view_products` |
| POST | `/products` | Create a product (multipart/form-data) | Yes | `create_product` |
| PATCH | `/products/:id` | Update a product | Yes | `update_product` |
| DELETE | `/products/:id` | Delete a product | Yes | `delete_product` |

**Query Parameters for GET /products:**
| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `searchTerm` | string | Search by name or SKU |

**Create/Update Product (multipart/form-data):**
| Field | Type | Description |
|-------|------|-------------|
| `image` | file | Product image (optional for update) |
| `data` | string (JSON) | Product data as JSON string |

**Product Data JSON:**
```json
{
  "name": "Wireless Mouse",
  "sku": "MOUSE-001",
  "category": "electronics",
  "purchasePrice": 12.50,
  "sellingPrice": 29.99,
  "stockQuantity": 150
}
```

---

### 🛒 Sales Routes

| Method | Endpoint | Description | Auth Required | Permission |
|--------|----------|-------------|---------------|------------|
| POST | `/sales` | Create a new sale | Yes | `create_sale` |
| GET | `/sales` | Get all sales (with pagination) | Yes | `view_sales` |
| DELETE | `/sales/:id` | Delete a sale | Yes | `delete_sale` |

**Create Sale Request Body:**
```json
{
  "items": [
    { "product": "<product_id>", "quantity": 2 },
    { "product": "<product_id>", "quantity": 1 }
  ]
}
```

---

### 🏷️ Role Routes

| Method | Endpoint | Description | Auth Required | Permission |
|--------|----------|-------------|---------------|------------|
| POST | `/roles` | Create a new role | Yes | `manage_roles` |
| GET | `/roles` | Get all roles | Yes | `manage_roles` |
| GET | `/roles/:id` | Get a single role | Yes | `manage_roles` |
| PATCH | `/roles/:id` | Update a role | Yes | `manage_roles` |
| DELETE | `/roles/:id` | Delete a role | Yes | `manage_roles` |

**Create Role Request Body:**
```json
{
  "name": "manager",
  "permissions": ["view_products", "create_product", "view_sales", "create_sale"]
}
```

---

### 📊 Dashboard Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard/summary` | Get dashboard statistics | Yes |

**Dashboard Response:**
```json
{
  "success": true,
  "data": {
    "totalProducts": 30,
    "totalSales": 15,
    "totalRevenue": 2500.00,
    "lowStockProducts": [...]
  }
}
```

---

## 📬 Postman Collection
A complete Postman collection (`Mini-ERP.postman_collection.json`) is available in the project root. Import it into Postman to test all endpoints with pre-configured requests.

**Postman Environment Variables:**
| Variable | Value |
|----------|-------|
| `base_url` | `http://localhost:5000/api/v1` |
| `access_token` | *(Set after login)* |

## 📁 Project Structure
```
src/
├── app/
│   ├── builder/         # Generic QueryBuilder
│   ├── config/          # App configuration
│   ├── errors/          # Custom error classes
│   ├── middlewares/     # Auth, validation, file upload
│   ├── modules/         # Feature modules (auth, product, sales, roles, dashboard)
│   └── utils/           # Helper utilities
├── app.ts               # Express app setup
└── server.ts            # Server entry point
```
