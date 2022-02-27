import express from "express";
import "express-async-errors";
import PostDatasModel from "../models/postDatasModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const catName = req.query.cat;
  console.log(catName);
  try {
    let foundPosts;
    if (catName) {
      foundPosts = await PostDatasModel.find({ catName });
    } else {
      foundPosts = await PostDatasModel.find();
    }
    res.status(200).json(foundPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const paramId = req.params.id;
  try {
    const foundPosts = await PostDatasModel.findById(paramId);
    res.status(200).json(foundPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newPost = new PostDatasModel({
      imgUrl: req.body.imgUrl,
      title: req.body.title,
      text: req.body.text,
      catName: req.body.catName,
      author: req.body.author,
    });
    const savedNewPost = await newPost.save();
    console.log(savedNewPost);
    res.status(201).json({ savedNewPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const foundPost = await PostDatasModel.findById(req.params.id);
    if (req.body.author === foundPost.author) {
      const updatedPost = await PostDatasModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnOriginal: false }
      );
      res.status(201).json(updatedPost);
    } else {
      res.status(401).json("You can update and delete own your posts!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const foundPost = await PostDatasModel.findById(req.params.id);
    if (req.body.author === foundPost.author) {
      foundPost.delete();
      res.status(204).json("The Post has been deleted!");
    } else {
      res.status(401).json("You can update and delete own your posts!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
});

export default router;
