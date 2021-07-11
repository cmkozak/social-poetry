const User = require("../model/User");

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
        .json({ error: "Login failed! Check authentication credentials" });
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
    res.json({ user });
  } catch (err) {
    res.status(404).json({ err: err });
  }
};
