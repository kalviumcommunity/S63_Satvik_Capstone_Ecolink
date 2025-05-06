import { jwtDecode } from 'jwt-decode'; // Named import
import api from '../utils/api';

const API_URL = '/auth'; // Base URL is already set in api.js

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Set token to localStorage and axios headers
const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("Token set in localStorage and Axios headers");
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    console.log("Token removed from localStorage and Axios headers");
  }
};

// Logout user
const logout = () => {
  setToken(null);
  // Optionally clear user data from localStorage if stored separately
  // localStorage.removeItem('user');
  console.log("User logged out, token cleared.");
};

// Initialize axios defaults with token if it exists
const initializeAuth = () => {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        console.log("Token expired, logging out.");
        logout(); // Clear expired token
        return null;
      }

      // Set token in axios defaults
      console.log("Auth initialized with valid token.");
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Return the decoded user payload from the token
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token during init:", error);
      logout(); // Clear invalid token
      return null;
    }
  }
  console.log("No token found during init.");
  return null;
};

// Register user
const register = async (userData) => {
  try {
    const response = await api.post(`${API_URL}/register`, userData);
    console.log('AuthService Register Response:', response.data);
    const { token, user } = response.data;
    if (token) {
       setToken(token);
    } else {
        console.error("No token received after registration");
    }
    return user; // Return the user object received from backend
  } catch (error) {
    console.error('AuthService Register Error:', error.response?.data || error);
    throw error.response?.data || { message: 'An error occurred during registration' };
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await api.post(`${API_URL}/login`, credentials);
    console.log('AuthService Login Response:', response.data);
    const { token, user } = response.data;
     if (token) {
       setToken(token);
    } else {
        console.error("No token received after login");
    }
    return user; // Return the user object received from backend
  } catch (error) {
    console.error('AuthService Login Error:', error.response?.data || error);
    throw error.response?.data || { message: 'Invalid credentials' };
  }
};

// Get current user payload from stored token
const getCurrentUser = () => {
  const token = getToken();
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
       console.error("Error decoding token for getCurrentUser:", error);
      logout(); // Clear invalid token
      return null;
    }
  }
  return null;
};

// Check if user is authenticated (valid, non-expired token exists)
const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    // Check if token expiry time is in the future
    return decodedToken.exp > Date.now() / 1000;
  } catch (error) {
    // If token is invalid, consider not authenticated
    return false;
  }
};

// Get user role from the decoded token
const getUserRole = () => {
  const user = getCurrentUser(); // Gets decoded payload
  return user ? user.role : null;
};

// Check if user has specific role
const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserRole,
  hasRole,
  initializeAuth,
  getToken
};

export default authService; 