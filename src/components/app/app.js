import React, { useEffect, useRef, useState } from 'react';
import { getMap, setMarker, useGeocodeQuery } from '../../services';
import {
	ADDRESS_TYPES,
	ICON_TYPES,
	MARKER_TITLES
} from '../../utils/constants';
import { getIcon, isAddressValid } from '../../utils';
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

function getEditedItem(state, address) {
	const editedItem = Object.keys(state).find(key => {
		return state[key].value === address;
	});
	return editedItem;
}

function App() {
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [initialLoading, setInitialLoading] = useState(true);
	const [map, setMap] = useState(null);

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

			const editedItem = getEditedItem(formState, address);

			if (isAddressValid(formState[editedItem].value)) {
				try {
					setMarker(
						getIcon(editedItem, ICON_TYPES.marker),
						map,
						{ lat, lng },
						MARKER_TITLES[editedItem]
					);
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
			}
		}
	}, [data, loading, error]);

	const handleItemBlur = ev => {
		const { name } = ev.target;
		getGeocode({ variables: { address: formState[name].value } });
	};

	const handleItemChange = ev => {
		const { value, name } = ev.target;
		setFormState({
			...formState,
			[name]: {
				...formState[name],
				value
			}
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
