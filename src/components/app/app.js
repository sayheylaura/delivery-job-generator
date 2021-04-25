import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import pickUpMarker from '../../assets/images/pickUpMarker.svg';
import useGeocodeQuery from '../../services/useGeocodeQuery';
import Form from '../form';
import LoadingState from '../loadingState';
import './app.sass';

function App() {
	const [initialLoading, setInitialLoading] = useState(true);
	const [map, setMap] = useState(null);

	const [state, setState] = useState({
		pickupAddress: '',
		dropoffAddress: ''
	});

	const mapRef = useRef();

	const { getGeocode, data, loading, error } = useGeocodeQuery();

	useEffect(async () => {
		try {
			const loader = new Loader({
				apiKey: process.env.API_KEY,
				version: 'weekly'
			});

			let gmap;

			await loader
				.load()
				.then(() => {
					gmap = new window.google.maps.Map(mapRef.current, {
						center: { lat: 48.864961, lng: 2.320186 },
						disableDefaultUI: true,
						zoom: 15
					});
				})
				.then(() => {
					setInitialLoading(false);
					setMap(gmap);
				});
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(() => {
		if (data && !loading && !error) {
			const { latitude: lat, longitude: lng } = data?.geocode;
			// eslint-disable-next-line no-new
			new window.google.maps.Marker({
				position: { lat, lng },
				map,
				icon: pickUpMarker
			});
		}
	}, [data]);

	const handleItemBlur = ev => {
		const { value } = ev.target;
		getGeocode({ variables: { address: value } });
	};

	const handleItemChange = ev => {
		const { value, name } = ev.target;
		setState({
			...state,
			[name]: value
		});
	};

	return (
		<main className="app">
			<div className="map" ref={mapRef} />
			{initialLoading ? (
				<LoadingState />
			) : (
				<Form
					onItemBlur={handleItemBlur}
					onItemChange={handleItemChange}
					state={state}
				/>
			)}
		</main>
	);
}

export default App;
