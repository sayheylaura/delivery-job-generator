import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_CATEGORIES } from '../../utils/constants';
import { joinClassNames } from '../../utils';
import './button.sass';

function Button({
	category,
	className,
	disabled,
	loading,
	onClick,
	text,
	type
}) {
	const handleOnClick = ev => {
		ev.preventDefault();
		onClick();
	};

	function getButtonCategory() {
		return BUTTON_CATEGORIES[category];
	}

	return (
		<button
			className={joinClassNames(
				'btn',
				`btn--${getButtonCategory()}`,
				loading ? 'btn--loading' : '',
				className
			)}
			disabled={disabled}
			onClick={handleOnClick}
			type={type}
		>
			{text}
		</button>
	);
}

Button.propTypes = {
	category: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

Button.defaultProps = {
	className: '',
	disabled: false,
	loading: false
};

export default Button;
