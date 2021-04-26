import { Loader } from '@googlemaps/js-api-loader';

async function getMap(element) {
	const loader = new Loader({
		apiKey: process.env.API_KEY,
		version: 'weekly'
	});

	await loader.load();

	const map = new window.google.maps.Map(element, {
		center: { lat: 48.864961, lng: 2.320186 },
		disableDefaultUI: true,
		zoom: 15
	});

	return map;
}

export default getMap;
