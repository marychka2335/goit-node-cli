import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.resolve(__dirname, 'db', 'contacts.json');

export async function listContacts () {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
};

export async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find(contact => contact.id === contactId);
  return contact || null;
};

export async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
};

export async function removeContact(contactId) {
  const list = await listContacts();
  const index = list.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return removeContact;
};

