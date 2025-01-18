# Media Task Backend API Documentation

## Overview
This backend service manages user media submissions and provides admin functionality for managing submissions. Built with Node.js, Express, and MongoDB, it features secure file uploads to Supabase storage and JWT-based admin authentication.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
- [Authentication](#authentication)
- [File Upload Specifications](#file-upload-specifications)

## Setup

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env

# Start the server
npm start
```

## Environment Variables

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=24h
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## API Endpoints

### User Routes

#### Submit Media
```http
POST /api/user/submit
Content-Type: multipart/form-data
```

**Request Body:**
- `name` (required): User's name
- `socialMedia` (required): Social media handle
- `images` (required): Multiple image files

**Response Example:**
```json
{
  "message": "Submission successful!",
  "submission": {
    "name": "John Doe",
    "socialMedia": "@johndoe",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }
}
```

### Admin Routes

#### Login
```http
POST /api/admin/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here"
}
```

#### Logout
```http
POST /api/admin/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

#### Get All Submissions
```http
GET /api/admin/submissions
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "submission_id",
    "name": "John Doe",
    "socialMedia": "@johndoe",
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  }
]
```

## Authentication
- Admin routes are protected using JWT authentication
- Include the JWT token in the Authorization header:
  ```
  Authorization: Bearer <token>
  ```
- Tokens expire after the configured time (default: 24h)
- Logged out tokens are blacklisted

## File Upload Specifications
- Supported formats: JPEG, PNG, GIF
- Maximum file size: 5MB per file
- Files are stored in Supabase storage
- Files are automatically renamed with timestamp prefix
- Original filenames are sanitized to remove special characters

## Error Handling
The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Security Features
- JWT-based authentication
- Token blacklisting
- Secure file upload validation
- Environment variable configuration
- CORS enabled
- Sanitized file names
- Request validation

## Development
This project uses:
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file handling
- Supabase for file storage