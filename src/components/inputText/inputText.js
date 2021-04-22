import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './inputText.sass';

function InputText({ id, label, placeholder, onChange }) {
	const [value, setValue] = useState('');

	const handleChange = ev => {
		setValue(ev.target.value);
		onChange();
	};

	return (
		<>
			<label htmlFor={id} className="input__label">
				{label}
			</label>
			<input
				type="text"
				className="input__field"
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
		</>
	);
}

InputText.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default InputText;
