import express from 'express';

import { changeAvatar } from '../controllers/users.js';
import ctrlWrapper from '../controllers/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const usersRouter = express.Router();

usersRouter.patch(
	'/avatars',
	authenticate,
	upload.single('avatar'),
	ctrlWrapper(changeAvatar)
);

export default usersRouter;
