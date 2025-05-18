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
  time: String,
  location: String,
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // only if NGO is stored in the User schema with role='ngo'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  impact: String, // e.g., "Planted 100 trees"
  imageUrl: String, // URL of the uploaded event image
  registrations: [
    {
      mode: String, // 'solo' or 'team'
      name: String,
      email: String,
      teamName: String,
      members: [
        {
          name: String,
          email: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Event', eventSchema);
