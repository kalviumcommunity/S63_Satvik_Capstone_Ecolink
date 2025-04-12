const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('EcoLink Backend Running!'));

// API routes
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const participantsRoutes = require('./routes/participationRoutes');
app.use('/api/participants', participantsRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
