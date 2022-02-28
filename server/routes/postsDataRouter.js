import express from "express";
import "express-async-errors";
import {
  deletePost,
  getAllPostsAndGetPostsByCatnames,
  getPostsById,
  updatePost,
  uploadPost,
} from "../controllers/postsDataController.js";

const router = express.Router();

router.get("/", getAllPostsAndGetPostsByCatnames);

router.get("/:id", getPostsById);

router.post("/", uploadPost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
