import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import './toaster.sass';

function Toaster({ onClick }) {
	return (
		<Button
			category="secondary"
			className="btn--toaster"
			onClick={onClick}
			text="Job has been created successfully!"
			type="button"
		/>
	);
}

Toaster.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default Toaster;
