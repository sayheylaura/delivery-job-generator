import React from 'react';
import PropTypes from 'prop-types';

function SvgImage({ className, image }) {
	return (
		<svg viewBox={image.viewBox} className={className}>
			<use href={image.url} />
		</svg>
	);
}

SvgImage.propTypes = {
	className: PropTypes.string.isRequired,
	image: PropTypes.shape({
		url: PropTypes.string,
		viewBox: PropTypes.string
	}).isRequired
};

export default SvgImage;
