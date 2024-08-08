import multer from 'multer';
import url from 'url';
import path from 'path';

const directoryUrl = new URL('.', import.meta.url);
const directoryPath = url.fileURLToPath(directoryUrl);

const tempDir = path.resolve(directoryPath, '../', 'temp');

const multerConfig = multer.diskStorage({
	destination: tempDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: multerConfig,
});

export default upload;
