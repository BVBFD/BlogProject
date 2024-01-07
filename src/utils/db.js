import mongoose from 'mongoose';

async function dbConnect() {
  let maxRetries = 1000;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
        dbName: `${process.env.MONGO_DB_DATABASE_NAME}`,
        connectTimeoutMS: 700,
        serverSelectionTimeoutMS: 700,
        maxPoolSize: 10,
        minPoolSize: 1,
      });

      console.log('MongoDB connected successfully!!');
      break;
    } catch (error) {
      currentRetry++;
      console.log('MongoDB connect failed!!');
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }

  if (currentRetry === maxRetries) {
    console.error('Max retries reached. MongoDB connection failed.');
  }
}

async function dbDisConnect() {
  return await mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
