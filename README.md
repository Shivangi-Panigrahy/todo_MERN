# Todo App with JWT Authentication

A full-stack todo application with JWT-based authentication, allowing each user to have their own private todo list.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Private Todo Lists**: Each user can only see and manage their own todos
- **Todo Management**: Create, read, update, delete, and toggle todos
- **Filtering & Sorting**: Filter by completion status, priority, and category
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API communication

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Todos (All protected)
- `GET /api/todos` - Get all todos for current user
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get specific todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

## Getting Started

### Live Demo
You can test the application at: [https://todo-mern-2-dc3q.onrender.com](https://todo-mern-2-dc3q.onrender.com)

**Test Credentials:**
- Email: `test@example.com`
- Password: `password123`

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CLIENT_ORIGIN=http://localhost:3000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication Flow

1. **Registration**: Users can create a new account with name, email, and password
2. **Login**: Users authenticate with email and password
3. **Token Storage**: JWT tokens are stored in localStorage
4. **Protected Routes**: All todo operations require authentication
5. **User Isolation**: Each user can only access their own todos

## Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs
- **JWT Tokens**: Secure token-based authentication
- **User Isolation**: Database queries filter by user ID
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for security

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Todo Model
```javascript
{
  user: ObjectId (required, ref: 'User'),
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date,
  category: String,
  timestamps: true
}
```

## Testing the API

You can test the authentication endpoints using curl:

### Register a new user
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Create a todo (with token)
```bash
curl -X POST http://localhost:8000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title": "Test Todo", "description": "This is a test", "priority": "high"}'
```

## Deployment

### Backend
- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure MongoDB connection string
- Set up proper CORS origins

### Frontend
- Build the project: `npm run build`
- Serve the build folder
- Update API URL in environment variables

## License

This project is open source and available under the [MIT License](LICENSE). 