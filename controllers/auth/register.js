const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { createError, sendMail } = require("../../helpers");
const { shortid } = require("shortid");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email is use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = shortid.generate();
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Veryfi email</a>`,
  };
  await sendMail(mail);
  res
    .status(201)
    .json({ user: { email: result.email, subscription: result.subscription } });
};

module.exports = register;