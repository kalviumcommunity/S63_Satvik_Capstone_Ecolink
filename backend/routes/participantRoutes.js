const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

// Dummy participants data
// const participants = [
//   {
//     id: 1,
//     name: 'Aarav Sharma',
//     event: 'Tree Plantation Drive',
//     contribution: 'Planted 5 trees'
//   },
//   {
//     id: 2,
//     name: 'Meera Joshi',
//     event: 'Beach Cleanup',
//     contribution: 'Collected 8kg of plastic'
//   },
//   {
//     id: 3,
//     name: 'Raj Kapoor',
//     event: 'Wildlife Awareness Workshop',
//     contribution: 'Volunteered as speaker'
//   }
// ];

// GET /api/participants - Returns all participants
router.get('/', (req, res) => {
  res.json(participants);
});

// POST /api/participants - Add a new participant
router.post('/', (req, res) => {
    const { name, event, contribution } = req.body;
  
    if (!name || !event || !contribution) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const newParticipant = {
      id: participants.length + 1,
      name,
      event,
      contribution
    };
  
    participants.push(newParticipant);
    res.status(201).json(newParticipant);
  });

// PUT /api/participants/:id - Update participant details
router.put('/:id', (req, res) => {
    const participantId = parseInt(req.params.id);
    const { name, event, contribution } = req.body;
  
    const index = participants.findIndex(p => p.id === participantId);
    if (index === -1) {
      return res.status(404).json({ error: 'Participant not found.' });
    }
  
    // Update fields (only if provided)
    participants[index] = {
      ...participants[index],
      name: name || participants[index].name,
      event: event || participants[index].event,
      contribution: contribution || participants[index].contribution
    };
  
    res.json(participants[index]);
  });
  
  
module.exports = router;
