// src/hooks/useAuth.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the context object from your context file

// Create and export the custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};