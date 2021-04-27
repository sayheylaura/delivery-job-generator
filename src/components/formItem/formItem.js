import React from 'react';
import PropTypes from 'prop-types';
import { joinClassNames } from '../../utils';
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
		<div
			className={joinClassNames('form-item__wrapper', className.wrapper)}
		>
			<SvgImage
				className={joinClassNames('form-item__icon', className.icon)}
				image={icon}
			/>
			<InputText
				className={{
					input: joinClassNames(
						'form-item__input--flex-grow',
						className.input
					)
				}}
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
	className: PropTypes.shape({
		icon: PropTypes.string,
		input: PropTypes.string,
		wrapper: PropTypes.string
	}),
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

FormItem.defaultProps = {
	className: {
		icon: '',
		input: '',
		wrapper: ''
	}
};

export default FormItem;
