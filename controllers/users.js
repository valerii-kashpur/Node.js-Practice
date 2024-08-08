import 'dotenv/config';
import * as fs from 'fs';
import url from 'url';
import path from 'path';

import { User } from '../models/user.js';
import resize from '../helpers/resize.js';

const directoryUrl = new URL('.', import.meta.url);
const directoryPath = url.fileURLToPath(directoryUrl);

const avatarsDir = path.resolve(directoryPath, '../', 'public', 'avatars');

export const changeAvatar = async (req, res) => {
	const { _id } = req.user;

	const { path: tempUpload, originalname } = req.file;
	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);

	await resize(tempUpload, 256, 256);

	await fs.rename(tempUpload, resultUpload, () => {});
	const avatarURL = path.join('avatars', filename);

	await User.findByIdAndUpdate(_id, { avatarURL });

	res.status(200).json({ avatarURL });
};
