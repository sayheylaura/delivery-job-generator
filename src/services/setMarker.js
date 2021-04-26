function setMarker(icon, map, position, title) {
	const marker = new window.google.maps.Marker({
		icon,
		map,
		position,
		title
	});
	return marker;
}

export default setMarker;
