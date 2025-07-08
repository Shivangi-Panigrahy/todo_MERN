import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = () => {
    onAuthSuccess();
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {isLogin ? (
            <Login onLogin={handleAuthSuccess} onSwitchToRegister={switchToRegister} />
          ) : (
            <Register onRegister={handleAuthSuccess} onSwitchToLogin={switchToLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth; 