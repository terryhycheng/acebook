const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already in use" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
    });
    await newUser.save();
    delete newUser.password;

    const token = generateToken(newUser._id);
    return res.status(201).json({
      token,
      user: newUser,
      message: "You've successfully signed up. Please log in.",
    });
  } catch (err) {
    return res.status(400).json({ message: "Bad request" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }, "username name email");
    const token = generateToken(req.userId);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser, getUser };
