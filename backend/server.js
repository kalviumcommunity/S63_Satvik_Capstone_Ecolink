const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./Database/db');
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', // Vite dev server
  process.env.CLIENT_URL, // Netlify URL
].filter(Boolean); // Filter out undefined/null values

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

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
const speciesRoutes = require('./routes/speciesRoutes');
const communityRoutes = require('./routes/communityRoutes');
const autocompleteRoutes = require('./routes/autocompleteRoutes');

// Serve public static files (e.g., images)
app.use(express.static(path.join(__dirname, 'public')));

// Base route
app.get('/', (req, res) => res.json({ status: 'API Running', message: 'Welcome to the EcoLink API' }));

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/participants', participantsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/autocomplete', autocompleteRoutes);

// TEMPORARY: Route to delete a user by email for debugging login issues
const User = require('./models/User');
app.delete('/api/debug/delete-user', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email query param required' });
    const result = await User.deleteOne({ email: email.toLowerCase() });
    res.json({ message: 'User deleted', result });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(err.status || 500).json({ 
      message: err.message || 'Internal Server Error' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
