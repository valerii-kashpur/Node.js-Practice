import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const contactSchema = new Schema(
	{
		name: { type: String, required: [true, 'Set name for contact'] },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError); // on db save error handler

export const Contact = model('contact', contactSchema);
