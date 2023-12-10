import mongoose from 'mongoose';

async function dbConnect() {
  await mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: 'myFirstDatabase',
    connectTimeoutMS: 1000,
    serverSelectionTimeoutMS: 1000,
    maxPoolSize: 10,
    minPoolSize: 1,
  });
  return;
}

async function dbDisConnect() {
  return await mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
