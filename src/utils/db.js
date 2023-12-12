import mongoose from 'mongoose';

async function dbConnect() {
  let maxRetries = 10;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {
        dbName: 'myFirstDatabase',
        connectTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000,
        maxPoolSize: 10,
        minPoolSize: 1,
      });

      console.log('MongoDB connected successfully!!');
      break;
    } catch (error) {
      currentRetry++;
      console.log('MongoDB connect failed!!');
      // Add some delay before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  if (currentRetry === maxRetries) {
    // Handle the case where max retries are reached
    console.error('Max retries reached. MongoDB connection failed.');
  }
}

async function dbDisConnect() {
  return await mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
