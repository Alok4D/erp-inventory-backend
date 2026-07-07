# Mini ERP - Backend API

This is the backend for the **Mini ERP – Inventory & Sales Management System**. It provides a robust RESTful API built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack
- **Node.js & Express.js**: Fast, unopinionated, minimalist web framework.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **MongoDB & Mongoose**: NoSQL database and object modeling for Node.js.
- **Zod**: TypeScript-first schema declaration and validation library.
- **JWT**: JSON Web Tokens for authentication and authorization.

## Features
- **Authentication & Authorization**: Secure JWT-based login with role-based access control (Admin, Manager, Employee).
- **Product Management**: CRUD operations with image upload support (Cloudinary/Multer).
- **Sales Management**: Process sales, automatic stock reduction, total calculation.
- **Dashboard API**: Real-time statistics for total products, total sales, and low stock alerts.
- **Dynamic Role & Permission Management**: Database-driven role creation and granular permission mapping.
- **Real-Time Updates via Socket.io**: Live WebSocket integration emitting events (e.g., `new_sale`) to keep connected clients instantly in sync.
- **Generic Query Builder**: Advanced querying with search, filter, sort, and pagination capabilities.
- **Global Error Handling**: Standardized error responses across all APIs.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)

## Setup & Installation

1. **Clone the repository and navigate to the backend folder**:
   ```bash
   git clone <repository-url>
   cd erp-inventory-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root of the backend directory and add the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_jwt_secret_key
   JWT_ACCESS_EXPIRES_IN=1d
   # Cloudinary credentials (if used)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the application**:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run build
     npm run start
     ```

## API Documentation
You can find the complete Postman collection for this API in the project root directory (`Mini-ERP.postman_collection.json`). Import it into Postman to test the endpoints.

### Key Endpoints
- **Auth**: `POST /api/v1/auth/login`
- **Dashboard**: `GET /api/v1/dashboard/summary`
- **Products**: 
  - `GET /api/v1/products` (Supports `?searchTerm=`, `?page=`, `?limit=`)
  - `POST /api/v1/products`
  - `PATCH /api/v1/products/:id`
  - `DELETE /api/v1/products/:id`
- **Sales**:
  - `POST /api/v1/sales`
  - `GET /api/v1/sales`

## Admin Login Credentials
To test the full capabilities of the system, use the following demo admin credentials (or create one using the Postman collection):
- **Email**: `admin@erp.com`
- **Password**: `password123`
