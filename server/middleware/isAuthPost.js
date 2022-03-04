import jwt from "jsonwebtoken";
import LoginDatasModel from "../models/loginDatasModel.js";

const isAuthPost = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log(req, res);
    return res.status(401).json("Authentication Error!");
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_Secret_Key, async (error, decoded) => {
    if (error) {
      console.log(req, res);
      return res.status(401).json("Authentication Error!");
    }
    const user = await LoginDatasModel.findById(decoded.data._id);
    if (!user) {
      console.log(req, res);
      return res.status(401).json("Authentication Error!");
    }
    next();
  });
};

export default isAuthPost;
