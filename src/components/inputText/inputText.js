import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './inputText.sass';

function InputText({ className, id, label, placeholder, onChange }) {
	const [value, setValue] = useState('');

	const handleChange = ev => {
		setValue(ev.target.value);
		onChange();
	};

	return (
		<>
			<label className="input__label" htmlFor={id}>
				{label}
			</label>
			<input
				className={`input__field ${className}`}
				id={id}
				onChange={handleChange}
				placeholder={placeholder}
				type="text"
				value={value}
			/>
		</>
	);
}

InputText.propTypes = {
	className: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired
};

export default InputText;
