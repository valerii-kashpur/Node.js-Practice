import Jimp from 'jimp';

const resize = async (filePath, width, height) => {
	await Jimp.read(filePath)
		.then(file => {
			return file
				.resize(width, height) // resize
				.writeAsync(filePath); // save
		})
		.catch(err => {
			console.error(err);
		});
};

export default resize;
