import { Contact } from '../models/contact.js';

import HttpError from '../helpers/HttpError.js';
import clearQuery from '../helpers/clearQuery.js';

export const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { offset = 0, limit = 5, favorite } = req.query;
	const filteredQuery = clearQuery({ owner, favorite });

	const contacts = await Contact.find(filteredQuery, '', {
		skip: offset,
		limit: limit,
	}).populate('owner', 'email');
	res.json(contacts);
};

export const getOne = async (req, res) => {
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

export const create = async (req, res) => {
	const { _id: owner } = req.user;
	const contact = await Contact.create({ ...req.body, owner });
	res.status(201).json(contact);
};

export const update = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(201).json(contact);
};

export const updateFavorite = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(201).json(contact);
};
