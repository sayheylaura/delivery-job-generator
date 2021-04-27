import React from 'react';
import PropTypes from 'prop-types';
import './button.sass';

function Button({ className, disabled, loading, onClick, text, type }) {
	const handleOnClick = ev => {
		ev.preventDefault();
		onClick();
	};

	return (
		<button
			className={`btn ${className} ${loading ? 'btn--loading' : ''}`}
			disabled={disabled}
			onClick={handleOnClick}
			type={type}
		>
			{text}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default Button;
