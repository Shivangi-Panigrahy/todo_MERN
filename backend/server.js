const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');

// Silence console.log in production except errors
if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
}

// Connect to database
connectDB();

const app = express();

// CORS config
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

// API-only backend - frontend will be deployed separately
// Static file serving removed for separate frontend/backend deployment

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 