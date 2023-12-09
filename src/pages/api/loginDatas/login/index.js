import dbConnect, { dbDisConnect } from '@/utils/db.js';
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
      const foundLoginData = await LoginDatasModel.findOne({
        userId: req.body.userId,
      });
      !foundLoginData && res.status(401).json('Invalid Id and Pwd!');

      const checkedPwd = await bcrypt.compare(req.body.password, foundLoginData.password);
      !checkedPwd && res.status(401).json('Invalid Id and Pwd!');

      const { password, ...sendLoginData } = foundLoginData._doc;
      res.status(200).json({ sendLoginData });
    } catch (err) {
      res.status(500).json('server errors!');
    }
  }

  return dbDisConnect();
}
