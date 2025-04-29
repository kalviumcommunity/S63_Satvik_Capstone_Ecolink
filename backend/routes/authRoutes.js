const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth'); // Import only verifyToken for the /me route

// REGISTER ROUTE
router.post('/register', authController.register);

// LOGIN ROUTE
router.post('/login', authController.login);

// GET /api/auth/me - Get current user profile (requires token verification)
// verifyToken middleware runs first, populating req.user if valid
router.get('/me', verifyToken, authController.getCurrentUser);

// POST /api/auth/logout - Logout user (clear cookie)
router.post('/logout', authController.logout);

module.exports = router;
