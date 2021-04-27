import dropOffBadgeBlankIcon from '../../../assets/images/sprite/dropOffBadgeBlank.svg';
import dropOffBadgeErrorIcon from '../../../assets/images/sprite/dropOffBadgeError.svg';
import dropOffBadgeSuccessIcon from '../../../assets/images/sprite/dropOffBadgePresent.svg';
import dropOffMarkerIcon from '../../../assets/images/dropOffMarker.svg';
import pickUpBadgeBlankIcon from '../../../assets/images/sprite/pickUpBadgeBlank.svg';
import pickUpBadgeErrorIcon from '../../../assets/images/sprite/pickUpBadgeError.svg';
import pickUpBadgeSuccessIcon from '../../../assets/images/sprite/pickUpBadgePresent.svg';
import pickUpMarkerIcon from '../../../assets/images/pickUpMarker.svg';

const ICONS = {
	pickupAddress: {
		blank: pickUpBadgeBlankIcon,
		error: pickUpBadgeErrorIcon,
		mapMarker: pickUpMarkerIcon,
		success: pickUpBadgeSuccessIcon
	},
	dropoffAddress: {
		blank: dropOffBadgeBlankIcon,
		error: dropOffBadgeErrorIcon,
		mapMarker: dropOffMarkerIcon,
		success: dropOffBadgeSuccessIcon
	}
};

function getIcon(addressType, iconType) {
	return ICONS[addressType][iconType];
}

export default getIcon;
