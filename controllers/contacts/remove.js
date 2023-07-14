const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers/index");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw createError(404, `Contact with id: ${contactId} didn't find`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;