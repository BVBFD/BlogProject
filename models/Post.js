import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled
const Post = mongoose.models.Post
  ? mongoose.model('Post') // If already compiled, use the existing model
  : mongoose.model('Post', postSchema); // If not, compile the model

export default Post;
