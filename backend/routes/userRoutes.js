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

module.exports = router;
