function setMarker(icon, map, position) {
	// eslint-disable-next-line no-new
	new window.google.maps.Marker({
		position,
		map,
		icon
	});
}

export default setMarker;
