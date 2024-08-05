import express from 'express';
import {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
} from '../controllers/auth.js';
import ctrlWrapper from '../controllers/ctrlWrapper.js';

import {
	registerSchema,
	loginSchema,
	updateSubscriptionSchema,
} from '../schemas/users.js';
import validateBody from '../middlewares/validateBody.js';
import authenticate from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post(
	'/register',
	validateBody(registerSchema),
	ctrlWrapper(register)
);

authRouter.post('/login', validateBody(loginSchema), ctrlWrapper(login));

authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

authRouter.post('/current', authenticate, ctrlWrapper(logout));

authRouter.post('/logout', authenticate, ctrlWrapper(logout));

authRouter.patch(
	'/subscription',
	validateBody(updateSubscriptionSchema),
	authenticate,
	ctrlWrapper(updateSubscription)
);

export default authRouter;
