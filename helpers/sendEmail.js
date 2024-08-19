import Mailjet from 'node-mailjet';
import 'dotenv/config';

const { MAILJET_API_KEY, MAILJET_SECRET_KEY, MAIL } = process.env;

const mailjet = new Mailjet({
	apiKey: MAILJET_API_KEY,
	apiSecret: MAILJET_SECRET_KEY,
});

const sendEmail = async data => {
	const email = { ...data, From: { Email: MAIL } };
	await mailjet
		.post('send', { version: 'v3.1' })
		.request({ Messages: [email] });
	return true;
};

export default sendEmail;
