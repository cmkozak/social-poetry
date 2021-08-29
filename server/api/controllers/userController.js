const User = require("../models/User");

exports.registerNewUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    const data = await user.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .json({ err: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};

exports.logoutUser = async (req, res) => {
  // TODO destroy token in database
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("name bio country")
      .lean();
    res.status(201).json({ user });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

exports.getUserSettings = async (req, res) => {
  try {
    const user = await User.findOne({
      "tokens.token": req.query.userToken,
    }).select("email name bio country");
    if (user && user.id == req.query.userId) {
      res.status(201).json({ user });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
  } catch (err) {
    res.status(404).json({ err: err });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      "tokens.token": req.body.userToken,
    }).select("id");
    if (user && user._id == req.body.data._id) {
      const userUpdate = await User.findOneAndUpdate(
        req.body.data._id,
        req.body.data
      );
      res.status(201).json({ userUpdate });
    } else {
      res.status(401).json({ err: "Invalid credentials" });
    }
  } catch (err) {
    res.status(404).json({ err: err });
  }
};
