import { readFile, writeFile } from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import * as url from 'url';

const directoryUrl = new URL('.', import.meta.url);
const directoryPath = url.fileURLToPath(directoryUrl);

const contactsPath = path.resolve(directoryPath, 'db', 'contacts.json');

export async function listContacts() {
	const contacts = await readFile(contactsPath, 'utf8').then(result =>
		JSON.parse(result)
	);

	return contacts;
}

export async function getContactById(contactId) {
	const contacts = await listContacts();
	return contacts.find(({ id }) => id === contactId) || null;
}

export async function removeContact(contactId) {
	const contactById = getContactById(contactId);
	const contacts = await listContacts();

	if (contactById) {
		const newData = contacts.filter(({ id }) => id !== contactId);
		await writeFile(contactsPath, JSON.stringify(newData));
	}
	return contactById;
}

export async function addContact(name, email, phone) {
	const id = uuidv4();
	const contacts = await listContacts();
	await writeFile(
		contactsPath,
		JSON.stringify([...contacts, { name, email, phone, id }])
	);

	return getContactById(id);
}
