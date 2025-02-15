const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Default local MongoDB URL
const client = new MongoClient(url);

let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('myDatabase'); // Specify your database name here
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
