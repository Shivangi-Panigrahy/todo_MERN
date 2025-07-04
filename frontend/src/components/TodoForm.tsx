import React, { useState } from 'react';
import { CreateTodoData } from '../types/todo';
import { Plus, X, Sparkles } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (todoData: CreateTodoData) => void;
  onCancel: () => void;
  isVisible: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState<CreateTodoData>({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      category: formData.category?.trim() || undefined,
      dueDate: formData.dueDate || undefined
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    });
    onCancel();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-2xl card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles size={24} className="text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Add New Todo</h2>
        </div>
        <button
          onClick={handleCancel}
          className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300"
        >
          <X size={24} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-white/90 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 transition-all duration-300"
            placeholder="What needs to be done?"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-white/90 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-white placeholder-white/60 transition-all duration-300"
            placeholder="Add more details..."
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="priority" className="block text-sm font-semibold text-white/90 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white transition-all duration-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-white/90 mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60 transition-all duration-300"
              placeholder="e.g., Work, Personal"
            />
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-semibold text-white/90 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            <Plus size={20} />
            Create Todo
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-8 py-4 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm; 