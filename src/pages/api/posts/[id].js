import dbConnect from '@/utils/db.js';
import PostDatasModel from '../../../../models/postDatasModel';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  try {
    await dbConnect();
  } catch (error) {
    res.status(500).json(error);
  }

  if (method === 'PUT') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return res.status(404).json('Post not found');
      }

      if (req.body.author === foundPost.author) {
        const updatedPost = await PostDatasModel.findByIdAndUpdate(id, req.body, { returnOriginal: false });

        res.status(201).json(updatedPost);
      } else {
        res.status(401).json('You can update and delete your own posts!');
      }
    } catch (err) {
      res.status(401).json(err);
    }
  }

  if (method === 'DELETE') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return res.status(404).json('Post not found');
      }

      if (req.body.author === foundPost.author) {
        await foundPost.remove();
        res.status(204).json('The Post has been deleted!');
      } else {
        res.status(404).json('You can update and delete your own posts!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
