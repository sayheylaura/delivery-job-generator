import React from 'react';
import PropTypes from 'prop-types';

import joinClassNames from '../../utils/joinClassNames';

import './button.sass';

const BUTTON_CATEGORIES = {
	primary: 'primary',
	secondary: 'secondary'
};

function Button({
	category,
	className,
	disabled,
	loading,
	onClick,
	text,
	type
}) {
	function getButtonCategory() {
		return BUTTON_CATEGORIES[category];
	}

	function handleOnClick(ev) {
		ev.preventDefault();
		onClick();
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
