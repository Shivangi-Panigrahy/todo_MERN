#!/bin/bash

echo "🚀 Setting up Todo App with JWT Authentication"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_ORIGIN=http://localhost:3000
EOF
    echo "✅ Created .env file"
    echo "⚠️  Remember to change JWT_SECRET in production!"
else
    echo "✅ .env file already exists"
fi

cd ..

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. Start the frontend: cd frontend && npm start"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Happy coding! 🚀" 