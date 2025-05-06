import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated, hasRole, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute Check:", { 
      loading, 
      isAuthenticated: isAuthenticated(), 
      currentUser: !!currentUser, 
      requiredRole, 
      hasRequiredRole: requiredRole ? hasRole(requiredRole) : true 
  });

  // Show loading state while initial auth check is running
  if (loading) {
    console.log("ProtectedRoute: Showing loading state...");
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <p className="ml-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login.");
    // Redirect to login page, saving the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if the user has that role
  if (requiredRole && !hasRole(requiredRole)) {
     console.log(`ProtectedRoute: User authenticated but lacks required role (${requiredRole}), redirecting to unauthorized.`);
    // Redirect to unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role (if any)
  console.log("ProtectedRoute: Access granted.");
  return children;
};

export default ProtectedRoute; 