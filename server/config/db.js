require('dotenv').config();
const mongoose = require('mongoose');

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI must be configured');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(mongoUri)
      .then(() => {
        console.log('✅ MongoDB connected successfully');
        return mongoose.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        console.error('❌ MongoDB connection failed:', error);
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
