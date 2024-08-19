import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';

import { User } from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import sendEmail from '../helpers/sendEmail.js';
import getVerifyEmail from '../helpers/getVerifyEmail.js';

const { SECRET_KEY, BASE_URL } = process.env;
const HASH_DIFFICULTY = 10;

export const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		HttpError(409, 'Email already is in use');
	}

	const hashPassword = await bcrypt.hash(password, HASH_DIFFICULTY);

	const avatarURL = gravatar.url(email);

	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = getVerifyEmail(email, BASE_URL, verificationToken);

	await sendEmail(verifyEmail);

	res.status(201).json({
		email: newUser.email,
	});
};

export const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });

	if (!user) {
		HttpError(401, 'Email not found');
	}

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: '',
	});

	res.json({
		message: 'Email verify success',
	});
};

export const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });

	if (!user) {
		HttpError(401, 'Email not found');
	}

	if (user.verify) {
		HttpError(401, 'Verification has already been passed');
	}

	const verifyEmail = getVerifyEmail(email, BASE_URL, user.verificationToken);

	await sendEmail(verifyEmail);

	res.json({
		message: 'Verification email sent',
	});
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		HttpError(401, 'Email or password invalid');
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		HttpError(401, 'Email or password invalid');
	}

	if (!user.verify) {
		HttpError(401, 'Email or password invalid');
	}

	const payload = { id: user._id };
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });

	await User.findByIdAndUpdate(user._id, { token });

	res.json({ token });
};

export const getCurrent = async (req, res) => {
	const { email } = req.user;

	res.json({ email });
};

export const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: null });

	res.status(204).json({ message: 'Logout success' });
};

export const updateSubscription = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res
		.status(201)
		.json(`Subscription status updated to ${req.body.subscription}`);
};
