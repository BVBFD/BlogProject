import jwt from "jsonwebtoken";
import LoginDatasModel from "../models/loginDatasModel.js";

const isAuthPost = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json("Authentication Error!");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_Secret_Key, async (error, decoded) => {
    if (error) {
      return res.status(401).json("Authentication Error!");
    }
    const user = await LoginDatasModel.findById(decoded.data._id);
    if (!user) {
      return res.status(401).json("Authentication Error!");
    }
    next();
  });
};

export default isAuthPost;
