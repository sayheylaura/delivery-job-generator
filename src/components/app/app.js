import React, { useState, useEffect, useRef } from 'react';
import pickUpMarkerIcon from '../../assets/images/pickUpMarker.svg';
import { getMap, setMarker, useGeocodeQuery } from '../../services';
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

	useEffect(() => {
		try {
			getMap(mapRef.current).then(gmap => {
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
			setMarker(pickUpMarkerIcon, map, { lat, lng });
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
