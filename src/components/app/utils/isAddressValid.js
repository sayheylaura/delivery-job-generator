const VALID_ADDRESSES = ['29 Rue du 4 Septembre', '15 Rue de Bourgogne'];

function isAddressValid(address) {
	return VALID_ADDRESSES.some(ad => {
		return ad.toLowerCase() === address.toLowerCase();
	});
}

export default isAddressValid;
