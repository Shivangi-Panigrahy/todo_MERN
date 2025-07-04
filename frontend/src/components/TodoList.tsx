import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import { Plus, Loader2, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

const TodoList: React.FC = () => {
  const {
    todos,
    loading,
    error,
    filters,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    updateFilters,
    clearError
  } = useTodos();

  const [showForm, setShowForm] = useState(false);

  const handleCreateTodo = async (todoData: any) => {
    try {
      await createTodo(todoData);
      setShowForm(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      await toggleTodo(id);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleUpdateTodo = async (id: string, todoData: any) => {
    try {
      await updateTodo(id, todoData);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
      } catch (error) {
        // Error is handled by the hook
      }
    }
  };

  const completedTodos = todos.filter(todo => todo.completed).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="flex items-center gap-3 text-white">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-lg">Loading your todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles size={32} className="text-yellow-400 float" />
          <h1 className="text-4xl font-bold gradient-text">Todo App</h1>
          <Sparkles size={32} className="text-yellow-400 float" style={{ animationDelay: '1s' }} />
        </div>
        <p className="text-white/80 text-lg">Organize your life, one task at a time ✨</p>
        
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
        >
          <Plus size={24} />
          Add New Todo
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-red-400" />
            <span className="text-red-100">{error}</span>
            <button
              onClick={clearError}
              className="ml-auto text-red-300 hover:text-red-100 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Todo Form */}
      <TodoForm
        onSubmit={handleCreateTodo}
        onCancel={() => setShowForm(false)}
        isVisible={showForm}
      />

      {/* Filters */}
      <TodoFilters
        filters={filters}
        onFiltersChange={updateFilters}
        totalTodos={todos.length}
        completedTodos={completedTodos}
      />

      {/* Todo List */}
      <div className="space-y-4">
        {todos.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <CheckCircle size={64} className="mx-auto text-white/40 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-3">No todos yet</h3>
              <p className="text-white/70 text-lg mb-6">
                {filters.completed !== undefined || filters.priority || filters.category
                  ? 'No todos match your current filters.'
                  : 'Start your productivity journey by adding your first todo!'}
              </p>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Plus size={20} />
                  Add Your First Todo
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggleTodo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-lg">
              {completedTodos} of {todos.length} todos completed
            </span>
            <span className="text-2xl font-bold gradient-text">
              {Math.round((completedTodos / todos.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 ease-out"
              style={{ 
                width: `${(completedTodos / todos.length) * 100}%`,
                '--progress-width': `${(completedTodos / todos.length) * 100}%`
              } as React.CSSProperties}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList; 