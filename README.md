# Product Catalog API

A robust RESTful API for managing a product catalog with JWT authentication, built with Node.js and Express.

## 🚀 Features

- 🔐 JWT-based authentication system
- 📦 Complete CRUD operations for products
- 💾 SQLite database integration
- ✅ Input validation and error handling
- 🧪 Comprehensive unit tests
- 🔒 Secure password hashing with bcrypt
- 🛡️ Protected routes with JWT verification

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-catalog-api.git
cd product-catalog-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
```
Request body:
```json
{
  "username": "admin",
  "password": "password123"
}
```
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Products

#### Get All Products
```http
GET /api/products
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Protected)
```http
POST /api/products
```
Headers:
```
Authorization: Bearer <your_jwt_token>
```
Request body:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Product (Protected)
```http
PUT /api/products/:id
```
Headers:
```
Authorization: Bearer <your_jwt_token>
```
Request body: Same as create product

#### Delete Product (Protected)
```http
DELETE /api/products/:id
```
Headers:
```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The test suite includes:
- Authentication tests
- Product CRUD operation tests
- Error handling tests

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request (invalid input) |
| 401 | Unauthorized (missing or invalid token) |
| 403 | Forbidden (invalid token) |
| 404 | Not Found (resource not found) |
| 500 | Internal Server Error |

## 🔒 Security Features

- Passwords are hashed using bcrypt
- JWT tokens expire after 1 hour
- Protected routes require valid JWT token
- Input validation for all requests
- SQL injection prevention through parameterized queries

## 📁 Project Structure

```
product-catalog-api/
├── app.js                 # Main application file
├── db/
│   └── database.js        # Database configuration and operations
├── middleware/
│   └── auth.js            # Authentication middleware
├── routes/
│   ├── auth.js            # Authentication routes
│   └── products.js        # Product routes
├── tests/
│   ├── auth.test.js       # Authentication tests
│   └── products.test.js   # Product tests
└── package.json           # Project dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js team
- SQLite team
- JWT team 