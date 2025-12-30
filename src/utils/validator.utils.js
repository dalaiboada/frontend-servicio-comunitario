export const areNotEmpty = (...args) => {
	return args.every(value => 
		value !== undefined && value !== null && value.toString().trim() !== ''
	);
};