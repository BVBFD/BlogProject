import mongoose from "mongoose";

const LoginDatasSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("LoginDatas", LoginDatasSchema);
