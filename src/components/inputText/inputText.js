import React from 'react';
import PropTypes from 'prop-types';
import './inputText.sass';

function InputText({
	className,
	id,
	label,
	name,
	onBlur,
	onChange,
	placeholder,
	value
}) {
	const handleOnBlur = ev => {
		onBlur(ev, id);
	};

	const handleChange = ev => {
		onChange(ev, id);
	};

	return (
		<>
			<label className="input__label" htmlFor={id}>
				{label}
			</label>
			<input
				className={`input__field ${className}`}
				id={id}
				name={name}
				onBlur={handleOnBlur}
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
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

export default InputText;
