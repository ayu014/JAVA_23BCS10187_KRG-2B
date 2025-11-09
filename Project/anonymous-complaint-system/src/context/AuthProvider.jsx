// src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // 1. Import the context from the new file
import { adminLogin } from '../services/api';

// The provider component itself
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    const response = await adminLogin({ username, password });
    if (response.success) {
      setToken(response.token);
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', response.token); 
    }
    return response;
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  return (
    // 2. Use the imported AuthContext here
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};