# 🚀 MERN Todo Application

A full-stack todo application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a beautiful, modern UI and comprehensive CRUD operations.

![Todo App](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete todos
- ✅ **Real-time Updates** - Instant UI updates without page refresh
- ✅ **Advanced Filtering** - Filter by status, priority, category
- ✅ **Smart Sorting** - Sort by date, title, priority, and more
- ✅ **Priority Management** - Low, Medium, High priority levels
- ✅ **Due Date Tracking** - Set and monitor due dates with visual indicators
- ✅ **Category Organization** - Organize todos by categories
- ✅ **Progress Tracking** - Visual progress bar and completion statistics

### 🎨 User Experience
- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Optimized for speed and efficiency
- 🔄 **Loading States** - Smooth loading indicators and transitions
- 🚨 **Error Handling** - Comprehensive error handling and user feedback
- 🎯 **Intuitive Interface** - Easy-to-use interface with clear visual hierarchy

### 🛠 Technical Features
- 🔒 **Type Safety** - Full TypeScript support for both frontend and backend
- 🏗 **Modular Architecture** - Clean, maintainable code structure
- 📊 **RESTful API** - Well-designed API with proper HTTP methods
- 🗄 **Database Indexing** - Optimized database queries with indexes
- 🔧 **Environment Configuration** - Flexible configuration management
- 📝 **Comprehensive Documentation** - Detailed setup and usage guides

## 🏗 Project Structure

```
todo/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React + TypeScript App
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript definitions
│   │   ├── utils/          # Utility functions
│   │   └── App.tsx         # Main app component
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd todo
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### Todos
- `GET /todos` - Get all todos (with optional filters)
- `GET /todos/:id` - Get single todo
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
- `PATCH /todos/:id/toggle` - Toggle todo completion

#### Query Parameters
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `category` - Filter by category
- `sort` - Sort by field (default: -createdAt)

#### Health Check
- `GET /health` - Check server status

### Request/Response Examples

#### Create Todo
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "high",
  "category": "work",
  "dueDate": "2024-01-15"
}
```

#### Get Todos with Filters
```bash
GET /api/todos?completed=false&priority=high&sort=-createdAt
```

## 🎨 UI Components

### TodoItem
- Beautiful card design with priority color coding
- Inline editing capabilities
- Visual indicators for due dates and completion status
- Smooth hover animations

### TodoForm
- Comprehensive form with all todo fields
- Real-time validation
- Responsive grid layout
- Clean, modern design

### TodoFilters
- Advanced filtering options
- Real-time filter updates
- Clear visual feedback
- Progress statistics

## 🛠 Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start    # Start development server
```

### Building for Production
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment
1. Set environment variables for production
2. Build and deploy to your preferred hosting service
3. Ensure MongoDB is accessible

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icons
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

**Happy Coding! 🎉** 