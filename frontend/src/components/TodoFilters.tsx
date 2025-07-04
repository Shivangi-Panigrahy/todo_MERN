import React, { useState, useEffect, useRef } from 'react';
import { TodoFilters as TodoFiltersType } from '../types/todo';
import { Filter, Sparkles } from 'lucide-react';

interface TodoFiltersProps {
  filters: TodoFiltersType;
  onFiltersChange: (filters: TodoFiltersType) => void;
  totalTodos: number;
  completedTodos: number;
}

const DEBOUNCE_MS = 300;

const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFiltersChange,
  totalTodos,
  completedTodos
}) => {
  const [categoryInput, setCategoryInput] = useState(filters.category || '');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const clearRef = useRef(false);

  // If all filters are cleared, reset the local input
  useEffect(() => {
    const allCleared = !filters.category && !filters.completed && !filters.priority && !filters.sort;
    if (allCleared) {
      setCategoryInput('');
    } else if (filters.category !== undefined) {
      setCategoryInput(filters.category || '');
    }
  }, [filters.category, filters.completed, filters.priority, filters.sort]);

  const handleFilterChange = (key: keyof TodoFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setCategoryInput('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    clearRef.current = true;
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  // Debounced update to parent filter
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput(e.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const value = e.target.value;
    debounceRef.current = setTimeout(() => {
      // Prevent debounce from running after clear
      if (clearRef.current) {
        clearRef.current = false;
        return;
      }
      handleFilterChange('category', value || undefined);
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Filter size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Filters & Sorting</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text">
            {completedTodos}/{totalTodos}
          </div>
          <div className="text-sm text-white/70">Completed</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            Status
          </label>
          <select
            value={filters.completed !== undefined ? filters.completed.toString() : ''}
            onChange={(e) => {
              const value = e.target.value;
              handleFilterChange('completed', value === '' ? undefined : value === 'true');
            }}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white transition-all duration-300"
          >
            <option value="">All Todos</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            Priority
          </label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value || undefined)}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white transition-all duration-300"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            Category
          </label>
          <input
            type="text"
            value={categoryInput}
            onChange={handleCategoryChange}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 transition-all duration-300"
            placeholder="Filter by category"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2">
            Sort By
          </label>
          <select
            value={filters.sort || '-createdAt'}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white transition-all duration-300"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center gap-2 text-white/80">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Active filters applied</span>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoFilters; 