const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers/index");

const findByIdAndUpdate = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, `Contact with id: ${contactId} didn't find`);
  }
  res.json(result);
};

module.exports = findByIdAndUpdate;