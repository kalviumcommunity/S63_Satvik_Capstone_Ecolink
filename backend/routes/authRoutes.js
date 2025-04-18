const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`Registration attempt with email: ${email}`);

    if (!name || !email || !password) {
      console.log('Registration failed: Missing required fields');
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    console.log(`Existing user found: ${!!existingUser}`);
    
    if (existingUser) {
      console.log(`User already exists with email: ${email}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();
    console.log(`User saved with email: ${email}`);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(`Registration successful for user: ${email}`);
    res.status(201).json({ message: 'User registered', token, user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(`Login attempt with email: ${email}`);
    
    if (!email || !password) {
      console.log('Login failed: Missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    console.log(`User found: ${!!user}`);
    
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    console.log(`Password match: ${isMatch}`);
    
    if (!isMatch) {
      console.log('Login failed: Invalid credentials');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(`Login successful for user: ${user.email}`);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
