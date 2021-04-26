import { VALID_ADDRESSES } from './constants';

function isAddressValid(address) {
	return VALID_ADDRESSES.some(ad => {
		return ad === address;
	});
}

export default isAddressValid;
