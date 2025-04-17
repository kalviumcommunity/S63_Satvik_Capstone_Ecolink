const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();
const connectDB = require('./Database/db');
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('EcoLink Backend Running!'));

// API routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const participantsRoutes = require('./routes/participantRoutes');

app.use('/api/participants', participantsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
