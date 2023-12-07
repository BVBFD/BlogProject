import mongoose from 'mongoose';

const postDatasSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: String,
      require: false,
      unique: false,
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    catName: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PostDatas || mongoose.model('PostDatas', postDatasSchema);
