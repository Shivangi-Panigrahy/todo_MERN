import React, { useState, useEffect } from 'react';
import { authService } from './services/authApi';
import Auth from './components/Auth';
import Header from './components/Header';
import TodoList from './components/TodoList';
import './App.css';

interface User {
  id: string;
  name: string;
  email: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = authService.getToken();
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <Header userName={user?.name || 'User'} onLogout={handleLogout} />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
