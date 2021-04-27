import { Loader } from '@googlemaps/js-api-loader';

const INITIAL_COORDINATES = { lat: 48.864961, lng: 2.320186 };

async function initializeGoogleMap(element) {
	const loader = new Loader({
		apiKey: process.env.API_KEY,
		version: 'weekly'
	});

	await loader.load();

	const map = new window.google.maps.Map(element, {
		center: INITIAL_COORDINATES,
		disableDefaultUI: true,
		zoom: 15
	});

	return map;
}

export default initializeGoogleMap;
