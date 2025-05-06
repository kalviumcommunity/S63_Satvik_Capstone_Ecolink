const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// GET /api/communities - Get all communities (public)
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find()
      .populate('owner', 'name')
      .populate('members', 'name');
    res.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ message: 'Server error fetching communities' });
  }
});

// GET /api/communities/:id - Get community by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('owner', 'name')
      .populate('members', 'name');
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    res.json(community);
  } catch (error) {
    console.error('Error fetching community by ID:', error);
    res.status(500).json({ message: 'Server error fetching community' });
  }
});

// POST /api/communities - Create a new community (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    
    // Create new community
    const newCommunity = new Community({
      name,
      description,
      owner: req.user.id,
      members: [req.user.id]
    });
    
    await newCommunity.save();
    
    // Populate owner and members info
    const community = await Community.findById(newCommunity._id)
      .populate('owner', 'name')
      .populate('members', 'name');
    
    res.status(201).json(community);
  } catch (error) {
    console.error('Error creating community:', error);
    res.status(500).json({ message: 'Server error creating community' });
  }
});

// PUT /api/communities/:id - Update community (protected, only owner)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Find community
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is the owner
    if (community.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the community owner can update this community' });
    }
    
    // Update fields
    if (name) community.name = name;
    if (description) community.description = description;
    
    await community.save();
    
    // Populate owner and members info
    const updatedCommunity = await Community.findById(community._id)
      .populate('owner', 'name')
      .populate('members', 'name');
    
    res.json(updatedCommunity);
  } catch (error) {
    console.error('Error updating community:', error);
    res.status(500).json({ message: 'Server error updating community' });
  }
});

// POST /api/communities/:id/join - Join a community (protected)
router.post('/:id/join', verifyToken, async (req, res) => {
  try {
    // Find community
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is already a member
    if (community.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already a member of this community' });
    }
    
    // Add user to members
    community.members.push(req.user.id);
    await community.save();
    
    // Populate owner and members info
    const updatedCommunity = await Community.findById(community._id)
      .populate('owner', 'name')
      .populate('members', 'name');
    
    res.json(updatedCommunity);
  } catch (error) {
    console.error('Error joining community:', error);
    res.status(500).json({ message: 'Server error joining community' });
  }
});

// POST /api/communities/:id/leave - Leave a community (protected)
router.post('/:id/leave', verifyToken, async (req, res) => {
  try {
    // Find community
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is the owner
    if (community.owner.toString() === req.user.id) {
      return res.status(400).json({ message: 'The owner cannot leave the community' });
    }
    
    // Check if user is a member
    if (!community.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are not a member of this community' });
    }
    
    // Remove user from members
    community.members = community.members.filter(
      memberId => memberId.toString() !== req.user.id
    );
    await community.save();
    
    // Populate owner and members info
    const updatedCommunity = await Community.findById(community._id)
      .populate('owner', 'name')
      .populate('members', 'name');
    
    res.json(updatedCommunity);
  } catch (error) {
    console.error('Error leaving community:', error);
    res.status(500).json({ message: 'Server error leaving community' });
  }
});

// DELETE /api/communities/:id - Delete community (protected, only owner)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Find community
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is the owner
    if (community.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the community owner can delete this community' });
    }
    
    await community.deleteOne();
    
    res.json({ message: 'Community deleted successfully' });
  } catch (error) {
    console.error('Error deleting community:', error);
    res.status(500).json({ message: 'Server error deleting community' });
  }
});

module.exports = router;