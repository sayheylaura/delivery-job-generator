import isAddressValid from './isAddressValid';

function validateForm(state) {
	const isValid = Object.keys(state).every(key => {
		const { value } = state[key];
		return !!(value.trim() && isAddressValid(value));
	});

	return isValid;
}

export default validateForm;
