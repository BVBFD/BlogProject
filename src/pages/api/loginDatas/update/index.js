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

  if (method === 'PUT') {
    if (req.body.password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(req.body.password, salt);
      const foundOriginData = await LoginDatasModel.findOne({
        userId: req.body.userId,
      });
      !foundOriginData && res.status(401).send('You can only set your own data!');
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
        res.status(201).json({ sendUpdatedLoginData });
      } catch (err) {
        res.status(401).send(err);
      }
    } else {
      const foundOriginData = await LoginDatasModel.findOne({
        userId: req.body.userId,
      });
      !foundOriginData && res.status(401).send('You can only set your own data!');
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
        res.status(201).json({ sendUpdatedLoginData });
      } catch (err) {
        res.status(401).send(err);
      }
    }
  }
}
