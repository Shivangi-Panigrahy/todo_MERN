export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthData {
  _id: string;
  name: string;
  email: string;
  token: string;
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

export interface AuthResponse {
  success: boolean;
  data: AuthData;
  error?: string | string[];
} 