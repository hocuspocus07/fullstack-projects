import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    // If no token, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected route if the user is authenticated
};

export default ProtectedRoute;
