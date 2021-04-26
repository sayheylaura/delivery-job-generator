import dropOffMarkerIcon from '../assets/images/dropOffMarker.svg';
import pickUpMarkerIcon from '../assets/images/pickUpMarker.svg';
import dropOffBadgeBlankIcon from '../assets/images/sprite/dropOffBadgeBlank.svg';
import dropOffBadgeErrorIcon from '../assets/images/sprite/dropOffBadgeError.svg';
import dropOffBadgeSuccessIcon from '../assets/images/sprite/dropOffBadgePresent.svg';
import pickUpBadgeBlankIcon from '../assets/images/sprite/pickUpBadgeBlank.svg';
import pickUpBadgeErrorIcon from '../assets/images/sprite/pickUpBadgeError.svg';
import pickUpBadgeSuccessIcon from '../assets/images/sprite/pickUpBadgePresent.svg';

const ICONS = {
	pickupAddress: {
		blank: pickUpBadgeBlankIcon,
		error: pickUpBadgeErrorIcon,
		marker: pickUpMarkerIcon,
		success: pickUpBadgeSuccessIcon
	},
	dropoffAddress: {
		blank: dropOffBadgeBlankIcon,
		error: dropOffBadgeErrorIcon,
		marker: dropOffMarkerIcon,
		success: dropOffBadgeSuccessIcon
	}
};

function getIcon(addressType, iconType) {
	return ICONS[addressType][iconType];
}

export default getIcon;
