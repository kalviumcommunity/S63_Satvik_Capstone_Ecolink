const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming a User model exists
const jwtConfig = require('../config/jwt');

// In-memory store for simplicity (replace with database in production)
let mockUsers = [
  {
    _id: '60f1f8a0b3f3e8a4c4e8b8a0', // Example MongoDB ObjectId
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: '$2a$10$XE6PJw.4vZfvgfT8V.8QWO/qAOQcBVgJQc7j7y1qHnSBlMEmwuYIC', // Hashed "admin123"
    role: 'admin'
  },
  {
    _id: '60f1f8a0b3f3e8a4c4e8b8a1',
    name: 'Regular User',
    email: 'user@example.com',
    passwordHash: '$2a$10$7J0nhJC7TNf2DxSHbMWiL.pVNpXQYWR3HTL61bTTfXx03c.x6uO0S', // Hashed "password123"
    role: 'user'
  }
];

// Utility function to generate JWT
const generateToken = (user) => {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
      // Add any other non-sensitive data needed in the token payload
    };
    return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

// Register new user
const register = async (req, res) => {
  console.log("Backend: /register endpoint hit");
  try {
    const { name, email, password } = req.body;
    console.log("Backend Register Data:", { name, email, password: '[REDACTED]' });

    // --- Basic Validation ---
    if (!name || !email || !password) {
      console.log("Backend Register Validation Failed: Missing fields");
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // --- Check if user exists (using real DB) ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log(`Backend Register Failed: User exists - ${email}`);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // --- Hash Password ---
    console.log(`Backend Register: Hashing password for ${email}`);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // --- Create New User (using real DB) ---
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      role: 'volunteer' // Using 'volunteer' as it's a valid role in the User model
    });
    await newUser.save();
    console.log("Backend Register: New user created (db):", newUser.email);

    // --- Generate Token ---
    const token = generateToken(newUser);
    console.log(`Backend Register: Token generated for ${email}`);

    // --- Set Cookie and Send Response ---
    res.cookie('token', token, jwtConfig.cookieOptions);

    // Return user data (excluding password) and the token itself
    const { password: _, ...userResponse } = newUser.toObject();
    console.log(`Backend Register: Responding 201 for ${email}`);
    res.status(201).json({
      message: 'Registration successful',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Backend Register Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- Basic Validation ---
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // --- Find User (using real DB) ---
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // --- Validate Password ---
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // --- Generate Token ---
    const token = generateToken(user);

    // --- Set Cookie and Send Response ---
    res.cookie('token', token, jwtConfig.cookieOptions);
    console.log(`Login successful for ${email}, token set in cookie.`);

    // Return user data (excluding password) and token
    const { password: _, ...userResponse } = user.toObject();
    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user profile (protected by verifyToken middleware)
const getCurrentUser = async (req, res) => {
  try {
    // req.user is populated by the verifyToken middleware with the token payload
    // Find the full user details from the database using the ID from the token
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log(`Get current user failed: No user found with ID ${req.user.id}`);
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
};

// Logout user
const logout = (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie('token', { 
        // Ensure options match those used when setting the cookie
        httpOnly: jwtConfig.cookieOptions.httpOnly,
        secure: jwtConfig.cookieOptions.secure,
        sameSite: jwtConfig.cookieOptions.sameSite,
        // path: '/' // Optional: specify path if needed
    });
    console.log("Logout successful, token cookie cleared.");
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout
}; 