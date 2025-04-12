const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  location: String,
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // only if NGO is stored in the User schema with role='ngo'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  impact: String // e.g., "Planted 100 trees"
});

module.exports = mongoose.model('Event', eventSchema);
