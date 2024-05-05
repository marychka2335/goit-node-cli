const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./contacts");

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case "get":
      const getContact = await contacts.getContactById(contactId);
      console.log(getContact);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;

    default:
      console.log("Unknown action type!");
      break;
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);