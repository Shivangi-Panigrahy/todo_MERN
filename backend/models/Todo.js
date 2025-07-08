const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    trim: true,
    default: 'general'
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
todoSchema.index({ user: 1, completed: 1, createdAt: -1 });
todoSchema.index({ user: 1, priority: 1 });
todoSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('Todo', todoSchema); 