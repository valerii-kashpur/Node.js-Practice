import { Contact } from '../models/contact.js';

import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

export const getOneContact = async (req, res) => {
	const contact = await Contact.findById(req.params.id);
	if (!contact) {
		throw HttpError(404);
	}
	res.json(contact);
};

export const deleteContact = async (req, res) => {
	const contact = await Contact.findByIdAndDelete(req.params.id);
	if (!contact) {
		throw HttpError(404);
	}
	res.json({ message: 'Delete success' });
};

export const createContact = async (req, res) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(201).json(contact);
};

export const updateContactFavorite = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(201).json(contact);
};
