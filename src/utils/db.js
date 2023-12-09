import mongoose from 'mongoose';

async function dbConnect() {
  await mongoose.connect(process.env.MONGO_DB_URL, {
    bufferCommands: false,
    dbName: 'myFirstDatabase',
  });
  return;
}

function dbDisConnect() {
  return mongoose.disconnect();
}

export { dbDisConnect };
export default dbConnect;
