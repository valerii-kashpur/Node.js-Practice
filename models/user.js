import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';
import { PASSWORD_LENGTH } from '../schemas/users.js';

const userSchema = new Schema(
	{
		password: {
			type: String,
			min: [
				PASSWORD_LENGTH.min,
				'Password can`t be shorter than 6 characters ',
			],
			max: [
				PASSWORD_LENGTH.max,
				'Password length upper limit is 16 characters',
			],
			required: [true, 'Password is required'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
		},
		subscription: {
			type: String,
			enum: ['starter', 'pro', 'business'],
			default: 'starter',
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError); // on db save error handler

export const User = model('user', userSchema);
