const { Schema, model } = require("mongoose");
const Joi = require("joi");

const group = ["work", "friend", "family", "other"];

const addContact = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
  group: Joi.string()
    .required()
    .valid(...group),
});

const updateFavorite = Joi.object({ favorite: Joi.boolean().required() });

const schemas = {
  addContact,
  updateFavorite,
};

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      uniqu: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true, uniqu: true },
    group: { type: String, enum: group, required: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };