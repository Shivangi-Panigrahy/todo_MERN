export interface Todo {
  _id: string;
  user: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
}

export interface UpdateTodoData extends Partial<CreateTodoData> {
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  sort?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string | string[];
} 