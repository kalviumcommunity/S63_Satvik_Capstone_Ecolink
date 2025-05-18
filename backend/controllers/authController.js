const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtConfig = require('../config/jwt');

// Utility function to generate JWT
const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

// Register new user
const register = async (req, res) => {
  console.log("Backend: /register endpoint hit");
  try {
    const { name, email, password } = req.body;
    console.log("Backend Register Data:", { name, email, password: '[REDACTED]' });

    if (!name || !email || !password) {
      console.log("Backend Register Validation Failed: Missing fields");
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log(`Backend Register Failed: User exists - ${email}`);
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create user (password will be hashed by pre-save hook)
    console.log('PLAIN PASSWORD TO SAVE:', password);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: 'volunteer'
    });
    await newUser.save();
    console.log('HASHED PASSWORD IN DB:', newUser.password);
    console.log("Backend Register: New user created (db):", newUser.email);

    const token = generateToken(newUser);
    console.log(`Backend Register: Token generated for ${email}`);

    res.cookie('token', token, jwtConfig.cookieOptions);

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
    console.log('LOGIN ATTEMPT: email:', email, 'password:', password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('HASHED PASSWORD FROM DB:', user.password);

    const isMatch = await user.comparePassword(password);
    console.log(password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for email ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.cookie('token', token, jwtConfig.cookieOptions);
    console.log(`Login successful for ${email}, token set in cookie.`);

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

// Get current user profile
const getCurrentUser = async (req, res) => {
  try {
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
    res.clearCookie('token', {
      httpOnly: jwtConfig.cookieOptions.httpOnly,
      secure: jwtConfig.cookieOptions.secure,
      sameSite: jwtConfig.cookieOptions.sameSite,
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
