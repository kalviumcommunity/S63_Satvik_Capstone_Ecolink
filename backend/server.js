const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./Database/db');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Routes
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const participantsRoutes = require('./routes/participantRoutes');
const uploadRoutes = require('./routes/upload'); 
const authRoutes = require('./routes/authRoutes');


// Base route
app.get('/', (req, res) => res.send('EcoLink Backend Running!'));

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/participants', participantsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes); 



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
