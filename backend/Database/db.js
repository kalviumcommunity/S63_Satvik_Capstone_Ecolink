const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(conn => {
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    })
    .catch(error => {
      console.log(`❌ Error: ${error.message}`);
      process.exit(1);
    });
};

module.exports = connectDB;
