import { program } from 'commander';
import * as db from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const argv = program.opts();

async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
     const allContacts = await db.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const oneContact = await db.getContactById(id);
      console.table(oneContact);
      break;

    case 'add':
      const newContact = await db.addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
     const deleteContact = await db.removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);