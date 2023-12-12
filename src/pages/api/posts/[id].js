import dbConnect, { dbDisConnect } from '@/utils/db.js';
import PostDatasModel from '../../../../models/postDatasModel';

async function cleanupAndRespond(res, statusCode, data) {
  dbDisConnect();
  return res.status(statusCode).json(data);
}

export async function getMetaData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_BASE_URL}/posts/${id}?meta=true`);
  const ps = await res.json();
  return ps;
}

export default async function handler(req, res) {
  const {
    method,
    query: { id, meta },
  } = req;

  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return cleanupAndRespond(res, 500, { error: 'Internal Server Error' });
  }

  if (method === 'GET') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return cleanupAndRespond(res, 404, { error: 'Post not found' });
      }

      const responseData = meta
        ? {
            ...foundPost.toObject(),
            text: undefined,
            updatedAt: undefined,
            createdAt: undefined,
            catName: undefined,
            author: undefined,
            _v: undefined,
          }
        : foundPost;

      return cleanupAndRespond(res, 200, responseData);
    } catch (err) {
      console.error('GET request error:', err);
    }
  }

  if (method === 'PUT') {
    try {
      const foundPost = await PostDatasModel.findById(id);

      if (!foundPost) {
        return cleanupAndRespond(res, 404, { error: 'Post not found' });
      }

      if (req.body.author === foundPost.author) {
        const updatedPost = await PostDatasModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        return cleanupAndRespond(res, 201, updatedPost);
      }

      return cleanupAndRespond(res, 401, { error: 'You can update and delete your own posts!' });
    } catch (err) {
      console.error('PUT request error:', err);
      return cleanupAndRespond(res, 500, { error: 'Internal Server Error' });
    }
  }

  if (method === 'POST') {
    try {
      const { user_id, editable } = req.body;

      if (user_id === `${process.env.Authority}` && editable) {
        await PostDatasModel.findByIdAndDelete(id);
        return cleanupAndRespond(res, 204, 'The Post has been deleted!');
      }

      return cleanupAndRespond(res, 401, 'Failed to delete!');
    } catch (err) {
      console.error('POST request error:', err);
      return cleanupAndRespond(res, 500, { error: 'Internal Server Error' });
    }
  }

  return cleanupAndRespond(res, 405, { error: 'Method Not Allowed' });
}
