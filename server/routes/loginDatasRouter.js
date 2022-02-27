import express from "express";
import "express-async-errors";
import LoginDatasModel from "../models/loginDatasModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body.userId, req.body.password);
    const foundLoginData = await LoginDatasModel.findOne({
      userId: req.body.userId,
    });
    !foundLoginData && res.status(401).json("Invalid Id and Pwd!");
    const checkedPwd = await bcrypt.compare(
      req.body.password,
      foundLoginData.password
    );
    !checkedPwd && res.status(401).json("Invalid Id and Pwd!");
    const { password, ...sendLoginData } = foundLoginData._doc;
    const token = createJwtToken(sendLoginData);
    res.status(200).json({ sendLoginData, token });
  } catch (err) {
    res.status(500).json("server errors!");
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    const newLoginData = new LoginDatasModel({
      userId: req.body.userId,
      password: hashedPwd,
      email: req.body.email,
    });
    const savedNewLoginData = await newLoginData.save();
    console.log(savedNewLoginData);
    const { password, ...data } = savedNewLoginData._doc;
    const token = createJwtToken(data);
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(409).json("This Id already existed!");
  }
});

function createJwtToken(data) {
  return jwt.sign({ data }, process.env.JWT_Secret_Key, {
    expiresIn: process.env.JWT_ExpiresIn,
  });
}

export default router;
