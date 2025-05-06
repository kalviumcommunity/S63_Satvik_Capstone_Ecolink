import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading until initial check is done
  const [error, setError] = useState(null);

  // Initialize auth on component mount
  useEffect(() => {
    console.log("AuthProvider mounting, initializing auth...");
    try {
      // Initialize token from localStorage and get decoded user payload
      const userPayload = authService.initializeAuth();
      if (userPayload) {
         console.log("User payload found during init:", userPayload);
         setCurrentUser(userPayload); // Set the decoded payload as currentUser
      } else {
         console.log("No valid user session found during init.");
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Potentially set an error state here
    } finally {
      setLoading(false); // Finished initial auth check
      console.log("Auth initialization complete.");
    }
  }, []);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      // authService.register handles setting the token
      // It returns the user object from the backend response
      const backendUser = await authService.register(userData);
      // Decode the new token to get the payload for the context state
      const userPayload = authService.getCurrentUser(); 
      console.log('AuthContext Setting User (Register):', userPayload);
      setCurrentUser(userPayload); // Set the decoded payload
      return backendUser; // Return the user object from backend if needed
    } catch (err) {
      console.error("Registration error in AuthContext:", err);
      setError(err.message || 'Registration failed');
      setCurrentUser(null); // Ensure user is null on error
      throw err; // Re-throw the error for the component to handle
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      // authService.login handles setting the token
      // It returns the user object from the backend response
      const backendUser = await authService.login(credentials);
      // Decode the new token to get the payload for the context state
      const userPayload = authService.getCurrentUser(); 
      console.log('AuthContext Setting User (Login):', userPayload);
      setCurrentUser(userPayload); // Set the decoded payload
      return backendUser; // Return the user object from backend if needed
    } catch (err) {
      console.error("Login error in AuthContext:", err);
      setError(err.message || 'Login failed');
      setCurrentUser(null); // Ensure user is null on error
      throw err; // Re-throw the error for the component to handle
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    console.log("Logging out user via AuthContext...");
    authService.logout(); // Clears token
    setCurrentUser(null); // Clears user state
    setError(null); // Clear any previous errors
  };

  // Check if user is authenticated based on current state
  const isAuthenticated = () => {
    // Check both the currentUser state and the service (in case state is stale)
    // Primarily rely on the presence of currentUser derived from a valid token
    return !!currentUser && authService.isAuthenticated();
  };

  // Check if user has a specific role
  const hasRole = (role) => {
     // Use the role from the currentUser state (decoded token payload)
    return currentUser ? currentUser.role === role : false;
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated,
    hasRole
  };
  
  // Log context value changes for debugging
  useEffect(() => {
     console.log("AuthContext value updated:", { currentUser, loading, error: error?.message });
  }, [currentUser, loading, error]);

  // Provide context, only render children when loading is finished
  return (
      <AuthContext.Provider value={value}>
        {/* {!loading ? children : <div>Loading Authentication...</div>} */}
         {/* Render children immediately, ProtectedRoute will handle loading state */}
         {children}
      </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) { // Check for undefined, as null is a valid initial state
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 