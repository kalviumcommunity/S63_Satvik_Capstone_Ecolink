const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const verifyToken = (req, res, next) => {
  // Prefer Authorization header, fallback to cookie
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
    console.log("Token found in Authorization header.");
  } else if (req.cookies?.token) {
    token = req.cookies.token;
    console.log("Token found in cookies.");
  } else {
     console.log("No token found in headers or cookies.");
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode token using the secret from config
    const decoded = jwt.verify(token, jwtConfig.secret);
    
    // Add decoded user payload to request object
    req.user = decoded; // Contains id, name, email, role etc.
    console.log("Token verified successfully. User:", req.user.email);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
     console.error("Token verification failed:", error.message);
     // Handle specific JWT errors
     if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired. Please log in again.' });
     } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token. Please log in again.' });
     } else {
          return res.status(500).json({ message: 'Failed to authenticate token.' });
     }
  }
};

// Middleware to authorize based on user roles
const authorize = (roles = []) => {
  // Ensure roles is always an array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
      // First, ensure the user is authenticated
      verifyToken,
      // Then, check if the authenticated user has one of the required roles
      (req, res, next) => {
        // req.user should be populated by verifyToken
        if (!req.user || !req.user.role) {
             console.error("Authorization check failed: req.user or req.user.role not found after verifyToken.");
             return res.status(403).json({ message: 'Forbidden: User role not identified.' });
        }
        
        if (roles.length && !roles.includes(req.user.role)) {
             console.log(`Authorization failed: User role '${req.user.role}' not in required roles [${roles.join(', ')}]`);
          // User's role is not allowed
          return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
        }
        
        console.log(`Authorization successful: User role '${req.user.role}' is allowed.`);
        // User has the required role, proceed to the route handler
        next();
      }
  ];
};

module.exports = {
  verifyToken, // Export for routes needing only authentication
  authorize    // Export for routes needing specific role authorization
}; 