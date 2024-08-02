import express from 'express';
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
	updateContactFavorite,
} from '../controllers/contactsControllers.js';
import ctrlWrapper from '../controllers/ctrlWrapper.js';

import {
	updateContactSchema,
	updateContactFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContacts));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContact));

contactsRouter.post(
	'/',
	validateBody(updateContactSchema),
	ctrlWrapper(createContact)
);

contactsRouter.put(
	'/:id',
	isValidId,
	validateBody(updateContactSchema),
	ctrlWrapper(updateContact)
);

contactsRouter.patch(
	'/:id/favorite',
	isValidId,
	validateBody(updateContactFavoriteSchema),
	ctrlWrapper(updateContactFavorite)
);

export default contactsRouter;
