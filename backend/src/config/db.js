const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', mongoose.connection.host);
    return;
  }

  // No URI set — try local first, then fall back to in-memory
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo_db', {
      serverSelectionTimeoutMS: 2000,
    });
    console.log('MongoDB connected:', mongoose.connection.host);
  } catch {
    console.log('Local MongoDB unavailable. Spinning up MongoMemoryServer...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('MongoDB connected (In-Memory):', mongoose.connection.host);
  }
};

module.exports = connectDB;
