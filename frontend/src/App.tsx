import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
