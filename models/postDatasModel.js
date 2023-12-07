// Import necessary modules
import mongoose from 'mongoose';

// Define the schema
const postDatasSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: false,
      unique: false,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    catName: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists
const PostDatas = mongoose.models.PostDatas || mongoose.model('PostDatas', postDatasSchema);

// Export the model
export default PostDatas;
