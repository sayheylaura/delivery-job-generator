import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import './map.sass';

function Map() {
	const mapRef = useRef();

	useEffect(() => {
		const loader = new Loader({
			apiKey: process.env.API_KEY,
			version: 'weekly'
		});
		loader.load().then(() => {
			// eslint-disable-next-line no-new
			new window.google.maps.Map(mapRef.current, {
				center: { lat: 48.864961, lng: 2.320186 },
				disableDefaultUI: true,
				zoom: 15
			});
		});
	}, []);

	return <div className="map" ref={mapRef} />;
}

export default Map;
