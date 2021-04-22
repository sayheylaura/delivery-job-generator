import React from 'react';
import PropTypes from 'prop-types';
import './button.sass';

function Button({ text, onClick }) {
	const handleOnClick = ev => {
		ev.preventDefault();
		onClick();
	};

	return (
		<button type="button" className="button" onClick={handleOnClick}>
			{text}
		</button>
	);
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Button;
