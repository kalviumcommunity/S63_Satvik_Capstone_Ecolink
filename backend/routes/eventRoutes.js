const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Dummy event data for local testing
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

// PUT /api/events/:id - Update an existing event
router.put('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const { title, description, date, time, location } = req.body;

  const eventIndex = events.findIndex(event => event.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  // Update only the provided fields
  events[eventIndex] = {
    ...events[eventIndex],
    title: title || events[eventIndex].title,
    description: description || events[eventIndex].description,
    date: date || events[eventIndex].date,
    time: time || events[eventIndex].time,
    location: location || events[eventIndex].location
  };

  res.json(events[eventIndex]);
});

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);

  const eventIndex = events.findIndex(event => event.id === eventId);
  if (eventIndex === -1) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  const deletedEvent = events.splice(eventIndex, 1)[0];
  res.json({ message: 'Event deleted successfully.', event: deletedEvent });
});

module.exports = router;
