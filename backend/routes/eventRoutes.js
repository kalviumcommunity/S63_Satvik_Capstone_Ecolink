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
    description: 'Let plant 100 trees together!',
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

// POST /api/events - Add a new event
router.post('/', (req, res) => {
    const { title, description, date, time, location } = req.body;
  
    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const newEvent = {
      id: events.length + 1,
      title,
      description,
      date,
      time,
      location
    };
  
    events.push(newEvent);
    res.status(201).json(newEvent);
  });

module.exports = router;
