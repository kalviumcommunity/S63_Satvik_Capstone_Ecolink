const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string exists:', !!process.env.MONGO_URI);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('❌ MongoDB Connection Error Details:');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.log('This usually means:');
      console.log('1. Your IP address is not whitelisted in MongoDB Atlas');
      console.log('2. The connection string is incorrect');
      console.log('3. The MongoDB Atlas cluster is not running');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
