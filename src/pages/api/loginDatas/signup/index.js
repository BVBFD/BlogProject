import dbConnect from '@/utils/db.js';
import LoginDatasModel from '../../../../../models/loginDatasModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'POST') {
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
      res.status(201).json({ data });
    } catch (err) {
      res.status(409).json('This Id already existed!');
    }
  }
}
