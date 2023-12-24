import mongoose from 'mongoose';

async function dbConnect() {
  let maxRetries = 1000;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await mongoose.connect(`${process.env.MONGO_DB_URL}`, {
        dbName: 'myFirstDatabase',
        connectTimeoutMS: 600,
        serverSelectionTimeoutMS: 600,
        maxPoolSize: 10,
        minPoolSize: 1,
      });

      console.log('MongoDB connected successfully!!');
      break;
    } catch (error) {
      currentRetry++;
      console.log('MongoDB connect failed!!');
      // Add some delay before retrying
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  }

  if (currentRetry === maxRetries) {
    // Handle the case where max retries are reached
    console.error('Max retries reached. MongoDB connection failed.');
  }
}

async function dbDisConnect() {
  // 원래는 await 비동기 작업 넣어주는 것이 맞지만 netlify 10s timed-out error 해결을 위해 어쩔수 없이 이렇게 씀.
  return await mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
