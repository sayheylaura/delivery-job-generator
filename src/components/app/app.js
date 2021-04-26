import React, { useEffect, useRef, useState } from 'react';
import { createMapMarker, getMap, useGeocodeQuery } from '../../services';
import {
	ADDRESS_TYPES,
	ICON_TYPES,
	MAP_MARKER_TITLES
} from '../../utils/constants';
import { getIcon } from '../../utils';
import Form from '../form';
import LoadingState from '../loadingState';
import './app.sass';

const INITIAL_FORM_STATE = {
	pickupAddress: {
		icon: getIcon(ADDRESS_TYPES.pickupAddress, ICON_TYPES.blank),
		value: ''
	},
	dropoffAddress: {
		icon: getIcon(ADDRESS_TYPES.dropoffAddress, ICON_TYPES.blank),
		value: ''
	}
};

function App() {
	const [editedItem, setEditedItem] = useState(null);
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [initialLoading, setInitialLoading] = useState(true);
	const [map, setMap] = useState(null);
	const [mapMarkers, setMapMarkers] = useState({
		pickupAddress: null,
		dropoffAddress: null
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

			try {
				const mapMarker = createMapMarker(
					getIcon(editedItem, ICON_TYPES.mapMarker),
					map,
					{ lat, lng },
					MAP_MARKER_TITLES[editedItem]
				);

				setMapMarkers({
					...mapMarkers,
					[editedItem]: mapMarker
				});

				setFormState({
					...formState,
					[editedItem]: {
						...formState[editedItem],
						icon: getIcon(editedItem, ICON_TYPES.success)
					}
				});
			} catch (err) {
				console.error(err);
			}

			return;
		}
		if (error) {
			mapMarkers[editedItem] && mapMarkers[editedItem].setMap(null);
			setFormState({
				...formState,
				[editedItem]: {
					...formState[editedItem],
					icon: getIcon(editedItem, ICON_TYPES.error)
				}
			});
		}
	}, [data, loading, error]);

	const handleItemBlur = ev => {
		const { name, value } = ev.target;
		setEditedItem(name);
		if (value.trim()) {
			getGeocode({ variables: { address: formState[name].value } });
		}
	};

	const handleItemChange = ev => {
		const { name, value } = ev.target;
		setEditedItem(name);
		setFormState({
			...formState,
			[name]: {
				...formState[name],
				value
			}
		});

		if (!value.trim()) {
			mapMarkers[name] && mapMarkers[name].setMap(null);
			setFormState({
				...formState,
				[editedItem]: {
					icon: getIcon(editedItem, ICON_TYPES.blank),
					value
				}
			});
		}
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
