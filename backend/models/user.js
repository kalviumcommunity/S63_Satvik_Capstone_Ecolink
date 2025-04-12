const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ngo', 'volunteer'],
    default: 'volunteer',
  },
  joinedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  points: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('User', userSchema);
