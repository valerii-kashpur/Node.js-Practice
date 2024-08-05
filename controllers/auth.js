import bcrypt from 'bcryptjs';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import HttpError from '../helpers/HttpError.js';

const { SECRET_KEY } = process.env;
const HASH_DIFFICULTY = 10;

export const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user) {
		HttpError(409, 'Email already is in use');
	}

	const hashPassword = await bcrypt.hash(password, HASH_DIFFICULTY);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		email: newUser.email,
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
