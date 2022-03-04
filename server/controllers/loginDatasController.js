import LoginDatasModel from "../models/loginDatasModel.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// function createJwtToken(data) {
//   return jwt.sign({ data }, process.env.JWT_Secret_Key, {
//     expiresIn: process.env.JWT_ExpiresIn,
//   });
// }

export const login = async (req, res, next) => {
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
    // const token = createJwtToken(sendLoginData);
    res.status(200).json({ sendLoginData });
  } catch (err) {
    res.status(500).json("server errors!");
  }
};

export const signUp = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    const newLoginData = new LoginDatasModel({
      userId: req.body.userId,
      password: hashedPwd,
      email: req.body.email,
      profilePic: req.body.profilePic,
      editable: req.body.editable,
    });
    const savedNewLoginData = await newLoginData.save();
    const { password, ...data } = savedNewLoginData._doc;
    // const token = createJwtToken(data);
    res.status(201).json({ data });
  } catch (err) {
    res.status(409).json("This Id already existed!");
  }
};

export const update = async (req, res, next) => {
  console.log(req.body.password === undefined);
  if (req.body.password !== undefined) {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);
    const foundOriginData = await LoginDatasModel.findOne({
      userId: req.body.userId,
    });
    !foundOriginData && res.status(401).send("You can only set your own data!");
    try {
      const updatedLoginData = await LoginDatasModel.findByIdAndUpdate(
        foundOriginData.id,
        {
          userId: req.body.updatedId,
          password: hashedPwd,
          email: req.body.email,
          profilePic: req.body.profilePic,
        },
        { returnOriginal: false }
      );
      const { password, ...sendUpdatedLoginData } = updatedLoginData._doc;
      // const token = createJwtToken(sendUpdatedLoginData);
      res.status(201).json({ sendUpdatedLoginData });
    } catch (err) {
      res.status(401).send(err);
    }
  } else {
    const foundOriginData = await LoginDatasModel.findOne({
      userId: req.body.userId,
    });
    !foundOriginData && res.status(401).send("You can only set your own data!");
    try {
      const updatedLoginData = await LoginDatasModel.findByIdAndUpdate(
        foundOriginData.id,
        {
          userId: req.body.updatedId,
          email: req.body.email,
          profilePic: req.body.profilePic,
        },
        { returnOriginal: false }
      );
      const { password, ...sendUpdatedLoginData } = updatedLoginData._doc;
      // const token = createJwtToken(sendUpdatedLoginData);
      res.status(201).json({ sendUpdatedLoginData });
    } catch (err) {
      res.status(401).send(err);
    }
  }
};

export const remove = async (req, res, next) => {
  try {
    console.log(req.body.userId);
    const foundUserData = await LoginDatasModel.findOne({
      userId: req.body.userId,
    });
    !foundUserData && res.status(400).json("Bad request!");
    if (req.body.userId === foundUserData.userId) {
      foundUserData.delete();
      res.status(204).json("UserData has been deleted!");
    } else {
      res.status(401).json("You can delete own your login data!");
    }
  } catch (err) {
    console.log(err);
  }
};
