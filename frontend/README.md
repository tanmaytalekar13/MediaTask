# Media Task Full-Stack Application Documentation

## Project Overview
A full-stack application for managing media submissions with admin dashboard functionality. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Supabase for file storage.

## Table of Contents
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Frontend Routes](#frontend-routes)
- [Authentication Flow](#authentication-flow)
- [File Upload Specifications](#file-upload-specifications)

## Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
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

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

## Frontend Routes
| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page with submission form | Public |
| `/admin-login` | Admin login page | Public |
| `/admin/dashboard` | Admin dashboard | Protected |

## Frontend Components
1. **Home Page**
   - User submission form
   - Image upload functionality
   - Form validation
   - Loading states

2. **Admin Login**
   - Authentication form
   - JWT token management
   - Redirect handling

3. **Admin Dashboard**
   - Protected route
   - Submissions display
   - Logout functionality
   - Token verification

## API Documentation

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

**Response:**
```json
{
  "message": "Submission successful!",
  "submission": {
    "name": "John Doe",
    "socialMedia": "@johndoe",
    "images": [
      "https://example.com/image1.jpg"
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

**Request:**
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

#### Get Submissions
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
    "images": ["url1", "url2"]
  }
]
```

## Authentication Flow
1. Admin accesses login page
2. Credentials verified against environment variables
3. JWT token generated and stored in localStorage
4. Protected routes check token validity
5. Automatic redirect to login if token invalid/expired

## Security Features
- JWT-based authentication
- Protected routes implementation
- Token blacklisting
- Secure file upload validation
- Environment variable configuration
- CORS enabled
- Request validation

## File Upload Specifications
- Supported formats: JPEG, PNG, GIF
- Maximum file size: 5MB per file
- Storage: Supabase
- Automatic file sanitization
- Unique filename generation

## Error Handling
- Form validation errors
- API error responses
- Network error handling
- Authentication errors
- File upload errors

## Technology Stack
### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file handling
- Supabase storage

### Frontend
- React.js with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Protected route components

## Development
1. Start backend server
2. Start frontend development server
3. Access application at `http://localhost:5173`

## Production
1. Build frontend: `npm run build`
2. Serve backend: `npm start`
3. Configure environment variables
4. Set up reverse proxy (optional)
