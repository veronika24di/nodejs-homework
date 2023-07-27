const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * 10;
  const result = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    { skip, limit: Number(limit) }
  ).populate("owner", "email name");
  res.status(200).json(result);
};

module.exports = getAll;