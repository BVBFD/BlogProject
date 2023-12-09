import dbConnect, { dbDisConnect } from '@/utils/db.js';
import LoginDatasModel from '../../../../../models/loginDatasModel';

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'DELETE') {
    try {
      const { query } = req;
      await LoginDatasModel.findOneAndDelete({ userId: `${query.userId}` });
      res.status(204).json();
    } catch (err) {
      res.status(500).json(err);
    }
  }

  return dbDisConnect();
}
