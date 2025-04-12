const express = require('express');
const router = express.Router();

// Dummy event data (just for testing)
const events = [
  {
    id: 1,
    title: 'Beach Cleanup Drive',
    description: 'Join us to clean up the local beach.',
    date: '2025-04-22',
    time: '09:00 AM',
    location: 'Marine Drive, Mumbai'
  },
  {
    id: 2,
    title: 'Tree Plantation Day',
    description: 'Let’s plant 100 trees together!',
    date: '2025-04-25',
    time: '08:30 AM',
    location: 'Eco Park, Delhi'
  },
  {
    id: 3,
    title: 'Wildlife Awareness Walk',
    description: 'An educational walk about endangered species.',
    date: '2025-05-01',
    time: '10:00 AM',
    location: 'Bannerghatta Zoo, Bengaluru'
  }
];

// GET /api/events - Returns list of events
router.get('/', (req, res) => {
  res.json(events);
});

module.exports = router;
