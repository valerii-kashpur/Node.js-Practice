const getVerifyEmail = (email, url, token) => ({
	To: [{ Email: email }],
	Subject: 'Verify email',
	HTMLPart: `<a target="_blank" href="${url}/api/auth/verify/${token}">Click verify email</a>`,
});

export default getVerifyEmail;
