import Joi from 'joi';

export const PASSWORD_LENGTH = {
	min: 6,
	max: 16,
};

const SUBSCRIPTIONS = ['starter', 'pro', 'business'];

export const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(PASSWORD_LENGTH.min)
		.max(PASSWORD_LENGTH.max)
		.required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(PASSWORD_LENGTH.min)
		.max(PASSWORD_LENGTH.max)
		.required(),
});

export const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid(...SUBSCRIPTIONS)
		.required(),
});
