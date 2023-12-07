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

  if (method === 'DELETE') {
    try {
      const foundUserData = await LoginDatasModel.findOne({
        userId: req.body.userId,
      });
      !foundUserData && res.status(400).json('Bad request!');
      if (req.body.userId === foundUserData.userId) {
        foundUserData.delete();
        res.status(204).json('UserData has been deleted!');
      } else {
        res.status(401).json('You can delete own your login data!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
