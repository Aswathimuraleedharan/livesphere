import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../services/AuthServices'; // Import services

function ProtectedRoute({ requiredRole }) {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();
  // alert(userRole);

  if (!isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    // Redirect based on role mismatch
    return requiredRole === 'admin' ? (
      <Navigate to="/chat" replace />
    ) : (
      <Navigate to="/admin-dashboard" replace />
    );
  }

  // Render child routes if authenticated and role matches
  return <Outlet />;
}

export default ProtectedRoute;
