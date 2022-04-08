import express from 'express';
import 'express-async-errors';
import {
  deletePost,
  getAllPostsAndGetPostsByCatnames,
  getPostsById,
  updatePost,
  uploadPost,
} from '../controllers/postsDataController.js';
import { isCSRFToken } from '../middleware/isCSRFToken.js';
import { isXSSToken } from '../middleware/isXSSToken.js';

const router = express.Router();

router.get('/', getAllPostsAndGetPostsByCatnames);

router.get('/:id', getPostsById);

router.post('/', isXSSToken, isCSRFToken, uploadPost);

router.put('/:id', isXSSToken, isCSRFToken, updatePost);

router.delete('/:id', isXSSToken, isCSRFToken, deletePost);

export default router;
