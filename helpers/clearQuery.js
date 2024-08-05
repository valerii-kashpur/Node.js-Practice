const clearQuery = obj => {
	const newObj = { ...obj };
	Object.keys(newObj).forEach(function (key) {
		if (typeof newObj[key] === 'undefined') {
			delete newObj[key];
		}
	});

	return newObj;
};

export default clearQuery;
