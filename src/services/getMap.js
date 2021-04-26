import { Loader } from '@googlemaps/js-api-loader';
import { INITIAL_COORDINATES } from '../utils/constants';

async function getMap(element) {
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

export default getMap;
