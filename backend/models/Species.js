const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  conservationStatus: {
    type: String,
    required: true,
    enum: ['Critically Endangered', 'Endangered', 'Vulnerable']
  },
  population: {
    type: String,
    required: true
  },
  habitat: {
    type: String,
    required: true
  },
  threats: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  location: {
    type: String,
    required: true
  },
  importance: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Species', speciesSchema);
