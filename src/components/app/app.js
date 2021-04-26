import React, { useEffect, useRef, useState } from 'react';
import pickUpMarkerIcon from '../../assets/images/pickUpMarker.svg';
import dropOffMarkerIcon from '../../assets/images/dropOffMarker.svg';
import { getMap, setMarker, useGeocodeQuery } from '../../services';
import isAddressValid from '../../utils/isAddressValid';
import Form from '../form';
import LoadingState from '../loadingState';
import './app.sass';

const MARKER_ICONS = {
	pickupAddress: pickUpMarkerIcon,
	dropoffAddress: dropOffMarkerIcon
};

const MARKER_TITLES = {
	pickupAddress: 'Pick up address',
	dropoffAddress: 'Drop off address'
};

function App() {
	const [initialLoading, setInitialLoading] = useState(true);
	const [map, setMap] = useState(null);

	const [formState, setFormState] = useState({
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
			const { address, latitude: lat, longitude: lng } = data?.geocode;
			const editedItem = Object.keys(formState).find(key => {
				return formState[key] === address;
			});
			if (isAddressValid(formState[editedItem])) {
				try {
					setMarker(
						MARKER_ICONS[editedItem],
						map,
						{ lat, lng },
						MARKER_TITLES[editedItem]
					);
				} catch (err) {
					console.error(err);
				}
			}
		}
	}, [data, loading, error]);

	const handleItemBlur = ev => {
		const { name } = ev.target;
		getGeocode({ variables: { address: formState[name] } });
	};

	const handleItemChange = ev => {
		const { value, name } = ev.target;
		setFormState({
			...formState,
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
					formState={formState}
					onItemBlur={handleItemBlur}
					onItemChange={handleItemChange}
				/>
			)}
		</main>
	);
}

export default App;
