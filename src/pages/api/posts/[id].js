import dbConnect from '@/utils/db.js';
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
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  if (method === 'GET') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (meta) {
        const { text, catName, author, createdAt, updatedAt, ...others } = foundPost.toObject();
        return res.status(200).json(others);
      } else {
        return res.status(200).json(foundPost);
      }
    } catch (err) {
      console.error('GET request error:', err);
      return;
    }
  }

  if (method === 'PUT') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (req.body.author === foundPost.author) {
        const updatedPost = await PostDatasModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(201).json(updatedPost);
      } else {
        return res.status(401).json({ error: 'You can update and delete your own posts!' });
      }
    } catch (err) {
      console.error('PUT request error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (method === 'POST') {
    try {
      const { user_id, editable } = req.body;

      if (user_id === `${process.env.Authority}` && editable) {
        await PostDatasModel.findByIdAndDelete(id);
        return res.status(204).json('The Post has been deleted!');
      } else {
        return res.status(401).json('Failed to delete!');
      }
    } catch (err) {
      console.error('POST request error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
