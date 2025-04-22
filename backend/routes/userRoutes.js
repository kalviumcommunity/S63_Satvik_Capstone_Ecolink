const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dummy user data for local testing
const users = [
  {
    id: 1,
    name: 'Satvik',
    email: 'satvik@example.com',
    location: 'Bangalore'
  },
  {
    id: 2,
    name: 'Aditi',
    email: 'aditi@example.com',
    location: 'Delhi'
  },
  {
    id: 3,
    name: 'Rohan',
    email: 'rohan@example.com',
    location: 'Mumbai'
  }
];

// GET /api/users - Returns list of users
router.get('/', (req, res) => {
  res.json(users);
});

// POST /api/users - Add a new user
router.post('/', (req, res) => {
  const { name, email, location } = req.body;

  if (!name || !email || !location) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    location
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user details
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, location } = req.body;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    location: location || users[userIndex].location
  };

  res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted successfully.', user: deletedUser });
});

module.exports = router;
