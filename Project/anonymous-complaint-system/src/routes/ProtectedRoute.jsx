// src/routes/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth'
;import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to the login page
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in, show the component (e.g., the Admin Dashboard)
  return <Outlet />;
};

export default ProtectedRoute;