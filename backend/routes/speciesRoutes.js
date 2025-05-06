const express = require('express');
const router = express.Router();
const Species = require('../models/Species');

// Get all species
router.get('/', async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single species by ID
router.get('/:id', async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new species
router.post('/', async (req, res) => {
  try {
    const species = new Species(req.body);
    const newSpecies = await species.save();
    res.status(201).json(newSpecies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a species
router.put('/:id', async (req, res) => {
  try {
    const species = await Species.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.json(species);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a species
router.delete('/:id', async (req, res) => {
  try {
    const species = await Species.findByIdAndDelete(req.params.id);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.json({ message: 'Species deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
