import PostDatasModel from '../models/postDatasModel.js';

export const getAllPostsAndGetPostsByCatnames = async (req, res, next) => {
  const catName = req.query.cat;
  console.log(catName);
  try {
    let foundPosts;
    if (catName) {
      try {
        foundPosts = await PostDatasModel.find({ catName });
      } catch (err) {
        res.status(404).json(err);
      }
    } else {
      foundPosts = await PostDatasModel.find();
    }
    res.status(200).json(foundPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPostsById = async (req, res, next) => {
  const paramId = req.params.id;
  try {
    try {
      const foundPosts = await PostDatasModel.findById(paramId);
      res.status(200).json(foundPosts);
    } catch (err) {
      res.status(404).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const uploadPost = async (req, res, next) => {
  try {
    const newPost = new PostDatasModel({
      imgUrl: req.body.imgUrl,
      title: req.body.title,
      text: req.body.text,
      catName: req.body.catName,
      author: req.body.author,
    });
    !newPost && res.status(400).json('Bad Request!');
    const savedNewPost = await newPost.save();
    console.log(savedNewPost);
    res.status(201).json({ savedNewPost });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePost = async (req, res, next) => {
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
      res.status(401).json('You can update and delete own your posts!');
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const foundPost = await PostDatasModel.findById(req.params.id);
    if (req.body.author === foundPost.author) {
      foundPost.delete();
      res.status(204).json('The Post has been deleted!');
    } else {
      res.status(401).json('You can update and delete own your posts!');
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
