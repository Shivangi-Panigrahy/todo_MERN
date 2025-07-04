# Todo App Backend

A RESTful API for managing todo items built with Node.js, Express, and MongoDB.

## Features

- ✅ CRUD operations for todos
- ✅ Filtering and sorting
- ✅ Priority levels (low, medium, high)
- ✅ Categories
- ✅ Due dates
- ✅ Completion status
- ✅ Input validation
- ✅ Error handling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion

### Query Parameters

- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `category` - Filter by category
- `sort` - Sort by field (default: -createdAt)

### Todo Schema

```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  completed: Boolean (default: false),
  priority: String (low/medium/high, default: medium),
  dueDate: Date,
  category: String (default: general),
  createdAt: Date,
  updatedAt: Date
}
```

## Health Check

- `GET /api/health` - Check server status

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon 