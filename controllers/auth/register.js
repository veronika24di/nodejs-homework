const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { createError } = require("../../helpers");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email is use");
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
};

module.exports = register;