import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoData, UpdateTodoData, TodoFilters } from '../types/todo';
import { todoApi } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({});

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoApi.getTodos({
        ...filters,
        // Remove category for API filtering, we'll filter in-memory for case-insensitivity
        category: undefined
      });
      let filteredTodos = response.data;
      // Case-insensitive category filter
      if (filters.category && filters.category.trim() !== '') {
        const cat = filters.category.trim().toLowerCase();
        filteredTodos = filteredTodos.filter(todo =>
          (todo.category || '').toLowerCase().includes(cat)
        );
      }
      setTodos(filteredTodos);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Create todo
  const createTodo = async (todoData: CreateTodoData) => {
    try {
      setError(null);
      const response = await todoApi.createTodo(todoData);
      setTodos(prev => [response.data, ...prev]);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to create todo';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      throw err;
    }
  };

  // Update todo
  const updateTodo = async (id: string, todoData: UpdateTodoData) => {
    try {
      setError(null);
      const response = await todoApi.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response.data : todo
      ));
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to update todo';
      setError(Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage);
      throw err;
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete todo');
      throw err;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const response = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response.data : todo
      ));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to toggle todo');
      throw err;
    }
  };

  // Update filters
  const updateFilters = (newFilters: TodoFilters) => {
    if (Object.keys(newFilters).length === 0) {
      setFilters({});
    } else {
      setFilters(prev => ({ ...prev, ...newFilters }));
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    filters,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    updateFilters,
    clearError,
    refetch: fetchTodos
  };
}; 