import express from 'express';
import {
	getAll,
	getOne,
	deleteContact,
	create,
	update,
	updateFavorite,
} from '../controllers/contacts.js';
import ctrlWrapper from '../controllers/ctrlWrapper.js';

import {
	updateContactSchema,
	updateContactFavoriteSchema,
} from '../schemas/contacts.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, ctrlWrapper(getAll));

contactsRouter.get('/:id', authenticate, isValidId, ctrlWrapper(getOne));

contactsRouter.delete(
	'/:id',
	authenticate,
	isValidId,
	ctrlWrapper(deleteContact)
);

contactsRouter.post(
	'/',
	authenticate,
	validateBody(updateContactSchema),
	ctrlWrapper(create)
);

contactsRouter.put(
	'/:id',
	authenticate,
	isValidId,
	validateBody(updateContactSchema),
	ctrlWrapper(update)
);

contactsRouter.patch(
	'/:id/favorite',
	authenticate,
	isValidId,
	validateBody(updateContactFavoriteSchema),
	ctrlWrapper(updateFavorite)
);

export default contactsRouter;
