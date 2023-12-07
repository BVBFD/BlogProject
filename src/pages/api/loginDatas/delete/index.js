import dbConnect from '@/utils/db.js';
import LoginDatasModel from '../../../../../models/loginDatasModel';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'POST') {
    try {
      const { user_id } = req.body;
      await LoginDatasModel.findOneAndDelete({ userId: user_id });
      res.status(204).json('UserData has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
