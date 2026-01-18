# FINDR - Lost & Found Item Marketplace

A modern full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that connects people who have lost items with those who have found them. Users can report lost or found items, search through listings, claim items, and communicate with other users through real-time messaging.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Database Models](#database-models)
- [Key Features Explained](#key-features-explained)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens stored in HTTP-only cookies
- **Lost & Found Item Management**: Post, search, and browse lost/found items with filtering
- **Item Categorization**: Filter items by category (electronics, keys, bags, pets, documents, clothing)
- **Location-Based Tracking**: Post items with specific locations
- **Item Claiming**: Mark items as claimed and associate with finders/owners
- **Real-Time Messaging**: Chat system for users to communicate about items
- **User Profiles**: Manage user information and profile pictures with Cloudinary integration
- **Image Upload**: Support for multiple images per item (up to 5 images)

### User Roles
- **Owner**: Can report lost items and claim found items
- **Finder**: Can report found items and search for lost items to return

### Image Support
- **Multiple Images**: Upload up to 5 images per item
- **Cloud Storage**: Cloudinary integration for image storage and optimization
- **Profile Pictures**: Upload and manage user profile images

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Dark Theme**: Modern dark-themed interface using Tailwind CSS
- **Form Validation**: React Hook Form with Yup for robust form handling
- **Toast Notifications**: React Toastify for user feedback
- **Search Functionality**: Real-time search with category filtering

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.0.1
- **Authentication**: JWT (jsonwebtoken 9.0.3) with HTTP-only cookies
- **Password Hashing**: bcryptjs 3.0.3
- **File Upload**: Multer 2.0.2 with Cloudinary storage
- **Image Storage**: Cloudinary 1.41.3
- **CORS**: cors 2.8.5
- **Logging**: Morgan 1.10.1
- **Environment**: dotenv 17.2.3
- **Cookie Parser**: cookie-parser 1.4.7

### Frontend
- **Library**: React 19.2.1
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router v6 (6.30.2)
- **HTTP Client**: Axios 1.13.2
- **Forms**: React Hook Form 7.67.0 with Yup validation
- **Animations**: Framer Motion 12.23.25
- **Icons**: Lucide React 0.555.0
- **Notifications**: React Toastify 11.0.5
- **Linting**: ESLint

## Project Structure

FINDR/
├── backend/
│ ├── config/
│ │ ├── cloudinary.js # Cloudinary configuration
│ │ └── db.js # MongoDB connection
│ ├── controllers/
│ │ ├── authController.js # Auth logic (register, login, logout, delete)
│ │ ├── itemController.js # Item CRUD operations
│ │ ├── chatController.js # Chat management
│ │ └── messageController.js # Message handling
│ ├── middlewares/
│ │ ├── auth.js # JWT verification middleware
│ │ ├── errorMiddleware.js # Error handling
│ │ └── upload.js # File upload middleware (Multer + Cloudinary)
│ ├── models/
│ │ ├── User.js # User schema
│ │ ├── Item.js # Item schema
│ │ ├── Chat.js # Chat schema
│ │ └── Message.js # Message schema
│ ├── routes/
│ │ ├── auth.js # Authentication routes
│ │ ├── user.js # User routes (profile upload)
│ │ ├── chat.js # Chat routes
│ │ ├── items.js # Item routes
│ │ └── messageRoutes.js # Message routes
│ ├── utils/
│ │ └── generateToken.js # JWT token generation
│ ├── .env # Environment variables (not in repo)
│ ├── server.js # Express server setup
│ └── package.json
│
├── Frontend/
│ ├── src/
│ │ ├── api/
│ │ │ ├── axios.js # Axios instance configuration
│ │ │ └── user.api.js # User API calls
│ │ ├── components/
│ │ │ ├── Header.jsx # Navigation header
│ │ │ ├── Footer.jsx # Footer component
│ │ │ └── ProtectedRoute.jsx # Auth-protected routes
│ │ ├── context/
│ │ │ └── AuthContext.jsx # Global auth state
│ │ ├── pages/
│ │ │ ├── Home.jsx # Main homepage with item listings
│ │ │ ├── Dashboard.jsx # User dashboard
│ │ │ ├── Login.jsx # Login page
│ │ │ ├── Register.jsx # Registration page
│ │ │ └── Profile.jsx # User profile settings
│ │ ├── assets/ # Images and static files
│ │ ├── App.jsx # Main App component with routing
│ │ ├── main.jsx # React entry point
│ │ └── index.css # Global styles
│ ├── public/ # Public assets
│ ├── vite.config.js # Vite configuration
│ ├── eslint.config.js # ESLint configuration
│ ├── package.json
│ └── index.html
│
└── README.md
## Installation### Prerequisites- Node.js (v14 or higher)- npm or yarn- MongoDB instance (local or cloud - MongoDB Atlas recommended)- Cloudinary account for image storage### Backend Setup1. Navigate to the backend directory:cd backend
Install dependencies:
npm install
Create a .env file in the backend directory with the following variables:
PORT=5000MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/findrJWT_SECRET=your_jwt_secret_key_here_minimum_32_charactersCLOUDINARY_CLOUD_NAME=your_cloudinary_nameCLOUDINARY_API_KEY=your_cloudinary_api_keyCLOUDINARY_API_SECRET=your_cloudinary_api_secret
Start the server:
# Development mode with auto-reload (requires nodemon)npm run dev# Production modenpm start
The backend will run on http://localhost:5000 (or your specified PORT)
Frontend Setup
Navigate to the frontend directory:
cd Frontend
Install dependencies:
npm install
Create a .env or .env.local file in the Frontend directory:
VITE_API_BASE=http://localhost:5000
Note: Make sure the port matches your backend PORT (default is 5000)
Start the development server:
npm run dev
The frontend will run on http://localhost:5173 (Vite default port)
Environment Variables
Backend (.env)
# Server ConfigurationPORT=5000# DatabaseMONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/findr# OR for local MongoDB:# MONGO_URI=mongodb://localhost:27017/findr# JWT Secret (use a strong random string)JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long# Cloudinary ConfigurationCLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_nameCLOUDINARY_API_KEY=your_cloudinary_api_keyCLOUDINARY_API_SECRET=your_cloudinary_api_secret
Frontend (.env.local)
VITE_API_BASE=http://localhost:5000
Important: Ensure the port in VITE_API_BASE matches your backend PORT.
Running the Application
Development Mode (Both Services Running)
Terminal 1 - Backend:
cd backendnpm run dev
Terminal 2 - Frontend:
cd Frontendnpm run dev
Then open http://localhost:5173 in your browser.
Production Build
Backend:
cd backendnpm start
Frontend:
cd Frontendnpm run buildnpm run preview
API Endpoints
Authentication Routes (/api/auth)
POST /api/auth/register - Register a new user
Body: { name, phone, password, role } (role is optional, defaults to 'owner')
Returns: { token, user: { id, name, phone, role, profileImage } }
Sets HTTP-only cookie with JWT token
POST /api/auth/login - Login user
Body: { phone, password }
Returns: { token, user: { id, name, phone, role, profileImage } }
Sets HTTP-only cookie with JWT token
GET /api/auth/me - Get current user (requires auth)
Returns: { user: { id, name, phone, role, profileImage, createdAt, updatedAt } }
POST /api/auth/logout - Logout user
Clears HTTP-only cookie
DELETE /api/auth/delete/:id - Delete user account (requires auth)
User can only delete their own account
User Routes (/api/user)
POST /api/user/upload-profile - Upload profile picture (requires auth)
Body: FormData with image field
Returns: { msg, url }
Uses Cloudinary for storage
GET /api/user/:id - Get user by ID (if implemented)
Item Routes (/api/items)
POST /api/items - Create a new item (lost/found) (requires auth)
Body: FormData with { title, description, location, category, status, images[] }
Images: Up to 5 images (multipart/form-data)
Returns: Created item object
GET /api/items - Get all items with optional filtering
Query params:
q (search query)
category (filter by category)
limit (limit results)
Returns: Array of items
GET /api/items/:id - Get item by ID (if implemented)
POST /api/items/claim - Claim an item (requires auth)
Body: { itemId, userId }
Updates item status to 'claimed' and sets claimedBy
DELETE /api/items/:id - Delete an item (if implemented)
Chat Routes (/api/chats)
POST /api/chats/start - Create or get existing chat (requires auth)
Body: { userId } (other user's ID)
Returns: Chat object
GET /api/chats - Get all user chats (requires auth)
Returns: Array of chats with populated user data
GET /api/chats/:id - Get chat by ID (if implemented)
Message Routes (/api/messages)
POST /api/messages - Send a message (requires auth)
Body: { chatId, text }
Returns: Created message object
Updates chat's lastMessage field
GET /api/messages/:chatId - Get messages in a chat (requires auth)
Returns: Array of messages sorted by createdAt
Frontend Routes
/ - Home page (browse all lost/found items, search, filter, report items)
/register - User registration page
/login - User login page
/dashboard - User dashboard (protected route)
/profile - User profile settings (protected route)
Database Models
User
{  _id: ObjectId,  name: String (required),  phone: String (required, unique),  profileImage: String (default: ""),  role: String (enum: ['owner', 'finder'], default: 'owner'),  password: String (hashed, required),  createdAt: Date,  updatedAt: Date}
Item
{  _id: ObjectId,  title: String (required),  description: String,  images: [{ url: String }], // Array of image objects  location: String (required),  category: String, // electronics, keys, bags, pets, documents, clothing  status: String (enum: ['lost', 'found', 'claimed'], default: 'lost'),  postedBy: ObjectId (ref: User, default: null),  claimedBy: ObjectId (ref: User, default: null),  createdAt: Date}
Chat
{  _id: ObjectId,  users: [ObjectId] (ref: User), // Array of 2 user IDs  lastMessage: String,  createdAt: Date,  updatedAt: Date}
Message
{  _id: ObjectId,  chatId: ObjectId (ref: Chat),  sender: ObjectId (ref: User), // Note: field name is 'sender' not 'senderId'  text: String,  createdAt: Date}
Key Features Explained
Item Status Flow
Lost - Item reported as lost, searching for it
Found - Item reported as found, looking for owner
Claimed - Item has been claimed by the appropriate party
Authentication Flow
User registers with name, phone number, password, and optional role
Password is hashed using bcryptjs (salt rounds: 10)
JWT token is generated with user ID and expires in 1 hour
Token is stored in HTTP-only cookie for security
Token is required for protected routes (sent automatically via cookies)
Middleware verifies token and attaches user object to request
Image Upload Process
User selects images from their device (up to 5 images)
Multer processes the file upload
Images are sent to Cloudinary via multer-storage-cloudinary
Cloudinary returns optimized URLs
URLs are stored in the Item model's images array
Profile images are also stored in Cloudinary
Chat System
Users can start a chat by providing another user's ID
System checks if chat already exists between the two users
If not, creates a new chat; otherwise returns existing chat
Messages are linked to chats via chatId
Last message is updated in Chat model for quick preview
Troubleshooting
Common Issues
MongoDB Connection Error
Verify MONGO_URI in .env is correct
Check if MongoDB instance is running
Ensure network access is allowed (for Atlas)
CORS Errors
Ensure backend CORS origin matches frontend URL
Check that credentials: true is set in CORS config
Authentication Issues
Verify JWT_SECRET is set in backend .env
Check that cookies are being sent (check browser DevTools)
Ensure credentials: 'include' is set in Axios requests
Image Upload Fails
Verify Cloudinary credentials in .env
Check file size limits (Multer default is 10MB)
Ensure image formats are supported (jpg, jpeg, png, webp)
API Connection Errors
Verify VITE_API_BASE matches backend PORT
Check that backend server is running
Ensure no firewall blocking the connection
Port Already in Use
Change PORT in backend .env if 5000 is taken
Update VITE_API_BASE in frontend .env accordingly
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the ISC License - see the backend/package.json file for details.
Note: This is a development project. For production deployment, ensure:
Use HTTPS for secure cookie transmission
Set secure: true in cookie options for production
Use environment-specific configurations
Implement rate limiting
Add input validation and sanitization
Set up proper error logging and monitoring
:
This README includes:- Updated project structure- API endpoints with request/response details- Environment variable setup- Troubleshooting- Notes on authentication, image upload, and chat- Production considerationsSince you're in ask mode, copy this content into `/Users/apple/Desktop/MERN-PROJECTS/FINDR/README.md`. If you want changes or additions, say so.
