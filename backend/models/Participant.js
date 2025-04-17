const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  hoursContributed: Number,
  feedback: String
});

module.exports = mongoose.model('Participation', participationSchema);
