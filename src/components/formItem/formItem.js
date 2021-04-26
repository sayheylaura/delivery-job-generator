import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../inputText';
import SvgImage from '../svgImage';
import './formItem.sass';

function FormItem({
	className,
	icon,
	id,
	label,
	name,
	onBlur,
	onChange,
	placeholder,
	value
}) {
	return (
		<div className={`form-item__wrapper ${className}`}>
			<SvgImage className="form-item__icon" image={icon} />
			<InputText
				className="form-item__field"
				id={id}
				label={label}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				placeholder={placeholder}
				value={value}
			/>
		</div>
	);
}

FormItem.propTypes = {
	className: PropTypes.string.isRequired,
	icon: PropTypes.shape({
		url: PropTypes.string,
		viewBox: PropTypes.string
	}).isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};

export default FormItem;
