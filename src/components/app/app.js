import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Form from '../form';
import LoadingState from '../loadingState';
import './app.sass';

function App() {
	const [initialLoading, setInitialLoading] = useState(true);

	const mapRef = useRef();

	useEffect(async () => {
		try {
			const loader = new Loader({
				apiKey: process.env.API_KEY,
				version: 'weekly'
			});

			await loader
				.load()
				.then(() => {
					// eslint-disable-next-line no-new
					new window.google.maps.Map(mapRef.current, {
						center: { lat: 48.864961, lng: 2.320186 },
						disableDefaultUI: true,
						zoom: 15
					});
				})
				.then(() => setInitialLoading(false));
		} catch (error) {
			console.error(error);
		}
	}, []);

	return (
		<main className="app">
			<div className="map" ref={mapRef} />
			{initialLoading ? <LoadingState /> : <Form />}
		</main>
	);
}

export default App;
