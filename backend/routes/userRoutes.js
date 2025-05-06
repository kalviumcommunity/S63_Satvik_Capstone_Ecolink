const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, authorize } = require('../middleware/authMiddleware');

// GET /api/users - Returns list of users (protected, admin only)
router.get('/', authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// GET /api/users/me - Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error fetching user profile' });
  }
});

// PUT /api/users/me - Update current user profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Build update object with only allowed fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email.toLowerCase();
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error updating user profile' });
  }
});

// GET /api/users/:id - Get user by ID (protected, admin only)
router.get('/:id', authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error fetching user' });
  }
});

// PUT /api/users/:id - Update user by ID (protected, admin only)
router.put('/:id', authorize(['admin']), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Build update object with only allowed fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email.toLowerCase();
    if (role) updateFields.role = role;
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ message: 'Server error updating user' });
  }
});

// DELETE /api/users/:id - Delete user by ID (protected, admin only)
router.delete('/:id', authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
});

module.exports = router;