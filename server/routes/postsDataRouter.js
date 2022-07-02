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
import { isDoubleClick } from '../middleware/isDoubleClick.js';

const router = express.Router();

router.get('/', getAllPostsAndGetPostsByCatnames);

router.get('/:id', getPostsById);

router.post('/', isXSSToken, isCSRFToken, isDoubleClick, uploadPost);

router.put('/:id', isXSSToken, isCSRFToken, isDoubleClick, updatePost);

router.delete('/:id', isXSSToken, isCSRFToken, deletePost);

export default router;
