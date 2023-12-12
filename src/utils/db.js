import mongoose from 'mongoose';

function dbConnect() {
  return mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: 'myFirstDatabase',
    connectTimeoutMS: 1000,
    serverSelectionTimeoutMS: 1000,
    maxPoolSize: 10,
    minPoolSize: 1,
  });
}

function dbDisConnect() {
  return mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
