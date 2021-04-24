import React from 'react';
import PropTypes from 'prop-types';
import './button.sass';

function Button({ className, onClick, text, type }) {
	const handleOnClick = ev => {
		ev.preventDefault();
		onClick();
	};

	return (
		<button
			className={`btn ${className}`}
			onClick={handleOnClick}
			type={type}
		>
			{text}
		</button>
	);
}

Button.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default Button;
