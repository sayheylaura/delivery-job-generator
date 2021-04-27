function joinClassNames(...args) {
	const filteredItems = new Set(args.filter(item => item && item.trim()));
	const result = [...filteredItems].join(' ');
	return result;
}

export default joinClassNames;
