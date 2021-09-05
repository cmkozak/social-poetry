const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  res.json({ post });
};

exports.getAllPosts = async (req, res) => {
  const data = await Post.find({})
    .select("title content createdAt")
    .sort({ createdAt: -1 })
    .lean();
  res.json({ data });
};

exports.getPostsByUser = async (req, res) => {
  try {
    const data = await Post.find({
      user: mongoose.Types.ObjectId(req.params.id),
    })
      .select("title content createdAt")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ data });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

exports.createPost = async (req, res) => {
  try {
    const user = await User.findOne({
      "tokens.token": req.body.userToken,
    });
    if (user && user.id == req.body.user) {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        user: mongoose.Types.ObjectId(req.body.user),
      });
      const data = await post.save();
      res.status(201).json({ data });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const user = await User.findOne({
      "tokens.token": req.body.userToken,
    });
    if (user && user.id == req.body.user) {
      const data = await Post.findOneAndUpdate(req.body.id, {
        "title" : req.body.title,
        "content" : req.body.content,
      }).lean();
      res.status(201).json({ data });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    const user = await User.findOne({
      "tokens.token": req.body.userToken,
    });
    if (user && user.id == post.user) {
      const data = post.remove();
      res.status(200).json({ data });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
