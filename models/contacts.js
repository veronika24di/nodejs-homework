const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "contacts.json");
const shortid = require("shortid");

const listContacts = async () => {
  const result = await fs.readFile(filePath);
  return JSON.parse(result);
};

const updateListAllContacts = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const [oneContact] = allContacts.filter((elem) => elem.id === contactId);
  if (!oneContact) {
    return null;
  }
  return oneContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: shortid.generate(), ...body };
  allContacts.push(newContact);
  await updateListAllContacts(allContacts);
  if (!newContact) {
    return null;
  }
  return newContact;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = allContacts.splice(index, 1);
  await updateListAllContacts(allContacts);
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...body, id: contactId };
  await updateListAllContacts(allContacts);
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};