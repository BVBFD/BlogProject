import express from "express";
import "express-async-errors";
import {
  deletePost,
  getAllPostsAndGetPostsByCatnames,
  getPostsById,
  updatePost,
  uploadPost,
} from "../controllers/postsDataController.js";
import isAuthPost from "../middleware/isAuthPost.js";

const router = express.Router();

router.get("/", getAllPostsAndGetPostsByCatnames);

router.get("/:id", getPostsById);

router.post("/", isAuthPost, uploadPost);

router.put("/:id", isAuthPost, updatePost);

router.delete("/:id", isAuthPost, deletePost);

export default router;
