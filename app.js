import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import { PATHS } from './routes/paths.js';

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', false);

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(PATHS.contacts, contactsRouter);
app.use(PATHS.auth, authRouter);

app.use((_, res) => {
	res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Server error' } = err;

	res.status(status).json({ message });
});

// .connect(DB_HOST, { ignoreUndefined: true })
mongoose
	.connect(DB_HOST)
	.then(() => console.log('Database connection successful'))
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running. Use our API on port: ${PORT}`);
		})
	)
	.catch(error => {
		console.log(error.message);
		process.exit(1);
	});
