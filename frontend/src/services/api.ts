import axios from 'axios';
import { Todo, CreateTodoData, UpdateTodoData, TodoFilters, ApiResponse } from '../types/todo';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoApi = {
  // Get all todos with optional filters
  getTodos: async (filters?: TodoFilters): Promise<ApiResponse<Todo[]>> => {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) {
      params.append('completed', filters.completed.toString());
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.sort) {
      params.append('sort', filters.sort);
    }

    const response = await api.get(`/todos?${params.toString()}`);
    return response.data;
  },

  // Get single todo
  getTodo: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData: CreateTodoData): Promise<ApiResponse<Todo>> => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, todoData: UpdateTodoData): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion
  toggleTodo: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};

export default api; 