const express = require('express');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} = require('../controllers/todoController');

const router = express.Router();

// Get all todos and create new todo
router.get('/', getTodos);
router.post('/', createTodo);

// Get, update, and delete specific todo
router.get('/:id', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

// Toggle todo completion
router.patch('/:id/toggle', toggleTodo);

module.exports = router; 