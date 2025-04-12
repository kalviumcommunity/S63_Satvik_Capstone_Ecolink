const express = require('express');
const router = express.Router();

// Dummy user data (for testing)
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
      return res.status(400).json({ error: 'All fields (name, email, location) are required.' });
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
  
module.exports = router;
