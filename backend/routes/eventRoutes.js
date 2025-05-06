const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Community = require('../models/Community');
const { verifyToken } = require('../middleware/authMiddleware');

// GET /api/events - Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('communityId', 'name')
      .populate('createdBy', 'name');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
});

// GET /api/events/:id - Get event by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('communityId', 'name')
      .populate('createdBy', 'name');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    res.status(500).json({ message: 'Server error fetching event' });
  }
});

// POST /api/events - Create a new event (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, date, location, communityId } = req.body;
    
    // Validate required fields
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: 'Title, description, date, and location are required' });
    }
    
    // If communityId is provided, verify that the user is the community owner
    if (communityId) {
      const community = await Community.findById(communityId);
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }
      
      if (community.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Only the community owner can create events' });
      }
    }
    
    // Create new event
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      communityId,
      createdBy: req.user.id
    });
    
    await newEvent.save();
    
    // Populate creator and community info
    const event = await Event.findById(newEvent._id)
      .populate('communityId', 'name')
      .populate('createdBy', 'name');
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error creating event' });
  }
});

// PUT /api/events/:id - Update event (protected, only creator)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    
    // Find event
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the creator
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the event creator can update this event' });
    }
    
    // Update fields
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    
    await event.save();
    
    // Populate creator and community info
    const updatedEvent = await Event.findById(event._id)
      .populate('communityId', 'name')
      .populate('createdBy', 'name');
    
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error updating event' });
  }
});

// DELETE /api/events/:id - Delete event (protected, only creator)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Find event
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the creator
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the event creator can delete this event' });
    }
    
    await event.deleteOne();
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error deleting event' });
  }
});

module.exports = router;