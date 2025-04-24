const express = require('express');
const router = express.Router();

// Dummy events data for local testing
let events = [
  {
    id: 1,
    title: 'Tree Plantation Drive',
    description: 'Join us for a community tree planting event',
    date: '2023-07-15',
    time: '09:00 AM',
    location: 'City Park'
  },
  {
    id: 2,
    title: 'Beach Cleanup',
    description: 'Help clean our local beaches',
    date: '2023-07-22',
    time: '08:30 AM',
    location: 'Main Beach'
  },
  {
    id: 3,
    title: 'Wildlife Conservation Workshop',
    description: 'Learn about local wildlife and conservation efforts',
    date: '2023-07-29',
    time: '10:00 AM',
    location: 'Community Center'
  }
];

// GET /api/events - Returns all events
router.get('/', (req, res) => {
  res.json(events);
});

// GET /api/events/:id - Returns a specific event by ID
router.get('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(e => e.id === eventId);
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }
  
  res.json(event);
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

// PUT /api/events/:id - Update event details
router.put('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const { title, description, date, time, location } = req.body;

  const index = events.findIndex(e => e.id === eventId);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  // Update fields only if provided
  events[index] = {
    ...events[index],
    title: title || events[index].title,
    description: description || events[index].description,
    date: date || events[index].date,
    time: time || events[index].time,
    location: location || events[index].location
  };

  res.json(events[index]);
});

// DELETE /api/events/:id - Delete an event by ID
router.delete('/:id', (req, res) => {
  const eventId = parseInt(req.params.id);

  const index = events.findIndex(e => e.id === eventId);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  const deletedEvent = events.splice(index, 1)[0];
  res.json({ message: 'Event deleted successfully.', event: deletedEvent });
});

module.exports = router;
