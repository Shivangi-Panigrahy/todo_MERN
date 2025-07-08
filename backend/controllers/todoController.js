const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    const { completed, priority, category, sort = '-createdAt' } = req.query;
    
    // Build filter object - always filter by user
    const filter = { user: req.user.id };
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    if (priority) {
      filter.priority = priority;
    }
    if (category) {
      filter.category = category;
    }

    const todos = await Todo.find(filter).sort(sort);
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      user: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Toggle todo completion
// @route   PATCH /api/todos/:id/toggle
// @access  Private
const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
}; 