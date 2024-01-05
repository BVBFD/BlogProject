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
      required: false,
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

const PostDatas = mongoose.models.PostDatas || mongoose.model('PostDatas', postDatasSchema);

export default PostDatas;
