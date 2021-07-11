const Post = require("../model/Post");

exports.getPost = async (req, res) => {
  const data = await Post.findById(req.body.id).lean();
  res.json({ data });
};

exports.getAllPosts = async (req, res) => {
  const data = await Post.find({}).sort({ createdAt: -1 }).lean();
  res.json({ data });
};

exports.getPostsByUser = async (req, res) => {
  const data = await Post.find({
    user: mongoose.Types.ObjectId(req.body.user),
  })
    .sort({ createdAt: -1 })
    .lean();
  res.json({ data });
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      user: mongoose.Types.ObjectId(req.body.user),
    });
    const data = await post.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    }).lean();
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const data = await Post.findByIdAndRemove(req.body.id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
