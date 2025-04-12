const express = require('express');
const router = express.Router();

// Dummy participants data
const participants = [
  {
    id: 1,
    name: 'Aarav Sharma',
    event: 'Tree Plantation Drive',
    contribution: 'Planted 5 trees'
  },
  {
    id: 2,
    name: 'Meera Joshi',
    event: 'Beach Cleanup',
    contribution: 'Collected 8kg of plastic'
  },
  {
    id: 3,
    name: 'Raj Kapoor',
    event: 'Wildlife Awareness Workshop',
    contribution: 'Volunteered as speaker'
  }
];

// GET /api/participants - Returns all participants
router.get('/', (req, res) => {
  res.json(participants);
});

module.exports = router;
