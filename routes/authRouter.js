import express from 'express';
import {
	register,
	verifyEmail,
	resendVerifyEmail,
	login,
	getCurrent,
	logout,
	updateSubscription,
} from '../controllers/auth.js';
import ctrlWrapper from '../controllers/ctrlWrapper.js';

import {
	registerSchema,
	emailSchema,
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

authRouter.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));

authRouter.post(
	'/verify',
	validateBody(emailSchema),
	ctrlWrapper(resendVerifyEmail)
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
