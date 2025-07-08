import axios from 'axios';
import { LoginData, RegisterData, AuthResponse, User } from '../types/auth';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  // Register new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await authApi.post('/auth/login', loginData);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<{ success: boolean; data: User }> => {
    const response = await authApi.get('/auth/me');
    return response.data;
  },

  // Logout (client-side only)
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Set auth token
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export default authApi; 