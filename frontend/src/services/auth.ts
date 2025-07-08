import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    token: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

// Get user from localStorage
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Set user in localStorage
export const setUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Remove user from localStorage
export const removeUser = (): void => {
  localStorage.removeItem('user');
};

export const authApi = {
  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  },

  // Login user
  login: async (userData: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; data: User }> => {
    const token = getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

// Create authenticated API instance
export const createAuthenticatedApi = () => {
  const token = getToken();
  
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
}; 