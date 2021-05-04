const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find(
        (contact) => contact.id === Number(contactId)
      );
      console.log(typeof contact.id);
      console.log(typeof contactId);
      console.table(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const contactsFiltered = contacts.filter(
        (contact) => contact.id !== Number(contactId)
      );
      if (contactsFiltered.length === contacts.length) {
        console.log(`Contact with ID ${contactId} don't exist!`);
        return;
      }
      fs.writeFile(contactsPath, JSON.stringify(contactsFiltered, null, "\t"));
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const id = Date.now();
      contacts.push({ id: id, name: name, email: email, phone: phone });
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
