const { Schema, model } = require("mongoose");
const Joi = require("joi");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const group = ["starter", "pro", "business"];

const registerUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
  subscription: Joi.string()
    .default("starter")
    .valid(...group),
  token: Joi.string().default(""),
});

const loginUser = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});
const updateSubUser = Joi.object({
  subscription: Joi.string().valid(...group),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
});

const schemas = {
  registerUser,
  verifyEmailSchema,
  loginUser,
  updateSubUser,
};

const userShema = Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      uniqu: true,
      match: emailRegexp,
    },
    password: { type: String, required: [true, "Password is required"] },
    subscription: { type: String, enum: group, default: "starter" },
    token: { type: String, default: "" },
    avatarURL: { type: String, required: true },
    verify: { type: Boolean, default: false },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userShema);

module.exports = {
  User,
  schemas,
};