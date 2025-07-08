import React from 'react';
import { authService } from '../services/authApi';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Todo App</h1>
          <div className="text-gray-200">
            Welcome, <span className="font-semibold text-white">{userName}</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header; 