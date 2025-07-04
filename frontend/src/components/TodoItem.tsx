import React, { useState } from 'react';
import { Todo, UpdateTodoData } from '../types/todo';
import { Check, Edit, Trash2, Calendar, Tag, AlertTriangle, Star } from 'lucide-react';
import { formatDate, getDueDateStatus, isOverdue } from '../utils/dateUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: UpdateTodoData) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
    category: todo.category || '',
    dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
  });

  const priorityColors = {
    low: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
    medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    high: 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
  };

  const priorityBorders = {
    low: 'border-l-green-400',
    medium: 'border-l-yellow-400',
    high: 'border-l-red-400'
  };

  const dueDateStatus = todo.dueDate ? getDueDateStatus(todo.dueDate) : null;
  const dueDateColors = {
    overdue: 'text-red-400',
    'due-today': 'text-orange-400',
    'due-soon': 'text-yellow-400',
    upcoming: 'text-green-400'
  };

  const handleSave = () => {
    onUpdate(todo._id, {
      ...editData,
      dueDate: editData.dueDate || undefined
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      category: todo.category || '',
      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl card-hover">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60"
            placeholder="Todo title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none text-white placeholder-white/60"
            placeholder="Description (optional)"
            rows={3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/60"
              placeholder="Category"
            />
            
            <input
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
            />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-l-4 transition-all duration-300 hover:bg-white/15 card-hover ${
      todo.completed 
        ? 'border-l-green-400 opacity-75' 
        : priorityBorders[todo.priority]
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(todo._id)}
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 text-white shadow-lg'
              : 'border-white/40 hover:border-purple-400 hover:bg-purple-400/20'
          }`}
        >
          {todo.completed && <Check size={16} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-semibold text-lg ${
              todo.completed ? 'line-through text-white/60' : 'text-white'
            }`}>
              {todo.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                title="Edit todo"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-300"
                title="Delete todo"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          {todo.description && (
            <p className={`text-white/80 mt-2 ${
              todo.completed ? 'line-through' : ''
            }`}>
              {todo.description}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
              priorityColors[todo.priority]
            }`}>
              <Star size={14} />
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>
            
            {todo.category && (
              <span className="inline-flex items-center gap-2 text-sm text-white/80 bg-white/10 px-3 py-1 rounded-full">
                <Tag size={14} />
                {todo.category}
              </span>
            )}
            
            {todo.dueDate && (
              <span className={`inline-flex items-center gap-2 text-sm ${
                dueDateColors[dueDateStatus!]
              } bg-white/10 px-3 py-1 rounded-full`}>
                <Calendar size={14} />
                {formatDate(todo.dueDate)}
                {isOverdue(todo.dueDate) && !todo.completed && (
                  <AlertTriangle size={14} className="text-red-400" />
                )}
              </span>
            )}
          </div>
          
          <div className="text-xs text-white/50 mt-3">
            Created {formatDate(todo.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 