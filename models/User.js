import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled
const User = mongoose.models.User
  ? mongoose.model('User') // If already compiled, use the existing model
  : mongoose.model('User', userSchema); // If not, compile the model

export default User;
