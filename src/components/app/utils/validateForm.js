function validateForm(form) {
	const isFormValid = Object.keys(form).every(key => {
		const { value, isValid } = form[key];
		return !!(value.trim() && isValid);
	});

	return isFormValid;
}

export default validateForm;
