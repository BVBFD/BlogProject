import dbConnect, { dbDisConnect } from '@/utils/db.js';
import PostDatasModel from '../../../../models/postDatasModel';

export default async function handler(req, res) {
  const {
    method,
    query: { id, meta },
  } = req;

  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  if (method === 'GET') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        res.status(404).json({ error: 'Post not found' });
      }

      if (meta) {
        const { text, updatedAt, createdAt, catName, author, _v, ...others } = foundPost.toObject();
        res.status(200).json(others);
      } else {
        res.status(200).json(foundPost);
      }
    } catch (err) {
      console.error('GET request error:', err);
    }
  }

  if (method === 'PUT') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        res.status(404).json({ error: 'Post not found' });
      }

      if (req.body.author === foundPost.author) {
        const updatedPost = await PostDatasModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        res.status(201).json(updatedPost);
      } else {
        res.status(401).json({ error: 'You can update and delete your own posts!' });
      }
    } catch (err) {
      console.error('PUT request error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (method === 'POST') {
    try {
      const { user_id, editable } = req.body;

      if (user_id === `${process.env.Authority}` && editable) {
        await PostDatasModel.findByIdAndDelete(id);
        res.status(204).json('The Post has been deleted!');
      } else {
        res.status(401).json('Failed to delete!');
      }
    } catch (err) {
      console.error('POST request error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.status(405).json({ error: 'Method Not Allowed' });
  return dbDisConnect();
}
