import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../inputText';
import SvgImage from '../svgImage';
import './formField.sass';

function FormField({ className, icon, inputTextId, label, placeholder }) {
	return (
		<div className={`form-field__wrapper ${className}`}>
			<SvgImage className="form-field__icon" image={icon} />
			<InputText
				className="form-field__field"
				id={inputTextId}
				label={label}
				onChange={() => {}}
				placeholder={placeholder}
			/>
		</div>
	);
}

FormField.propTypes = {
	className: PropTypes.string.isRequired,
	icon: PropTypes.shape({
		url: PropTypes.string,
		viewBox: PropTypes.string
	}).isRequired,
	inputTextId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
};

export default FormField;
