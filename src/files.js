// import * as url from 'url'; // not pretty way to use files

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url)); //  not pretty way to define dirname
// const __filename = url.fileURLToPath(import.meta.url);  //  not pretty way to define filename

// import * as fs from 'node:fs/promises'; // async file system methods
import { readdir, stat } from 'node:fs/promises';
import * as url from 'url';

const directoryUrl = new URL('.', import.meta.url);
const directoryPath = url.fileURLToPath(directoryUrl); // modern way to define dirname

readdir(directoryPath)
	.then(files => {
		return Promise.all(
			files.map(async filename => {
				const fileUrl = new URL(filename, directoryUrl);
				const stats = await stat(fileUrl);
				return {
					Name: filename,
					Size: stats.size,
					Date: stats.mtime,
				};
			})
		);
	})
	.then(result => console.table(result));

// ******** OLD way to work with files ********

// const fs = require('fs').promises;

// fs.readdir(__dirname)
//  .then(files => {
//    return Promise.all(
//      files.map(async filename => {
//        const stats = await fs.stat(filename);
//        return {
//          Name: filename,
//          Size: stats.size,
//          Date: stats.mtime,
//        };
//      }),
//    );
//  })
//  .then(result => console.table(result));
