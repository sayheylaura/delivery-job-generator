import React, { useEffect, useRef, useState } from 'react';

import Form from '../form';
import LoadingState from '../loadingState';
import Toaster from '../toaster';

import {
	createMapMarker,
	initializeGoogleMap,
	removeMapMarker,
	useForm,
	useGeocodeQuery,
	usePostJobMutation
} from './services';
import {
	ADDRESS_TYPES,
	ICON_TYPES,
	MAP_MARKER_TITLES,
	STATES
} from './utils/constants';
import { getIcon, validateForm } from './utils';

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
	const [enableFormButton, setEnableFormButton] = useState(false);
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [mapMarkers, setMapMarkers] = useState({
		pickupAddress: null,
		dropoffAddress: null
	});
	const [showToaster, setShowToaster] = useState(false);

	const {
		actions: { onMapLoaded, onMapLoadError },
		googleMap,
		status
	} = useForm();

	const loading = status === STATES.map_loading;

	const mapRef = useRef();

	const { getGeocode, data, loading: geocoding, error } = useGeocodeQuery();
	const { mutate, loading: creating } = usePostJobMutation();

	useEffect(() => {
		try {
			initializeGoogleMap(mapRef.current).then(gmap => {
				onMapLoaded(gmap);
			});
		} catch {
			onMapLoadError();
		}
	}, []);

	useEffect(() => {
		if (data && !geocoding && !error) {
			const { latitude: lat, longitude: lng } = data?.geocode;

			try {
				const mapMarker = createMapMarker(
					getIcon(editedItem, ICON_TYPES.mapMarker),
					googleMap,
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

				validateForm(formState) && setEnableFormButton(true);
			} catch (err) {
				console.error(err);
			}
		}

		if (error) {
			removeMapMarker(mapMarkers[editedItem]);

			setMapMarkers({
				...mapMarkers,
				[editedItem]: null
			});

			setFormState({
				...formState,
				[editedItem]: {
					...formState[editedItem],
					icon: getIcon(editedItem, ICON_TYPES.error)
				}
			});

			setEnableFormButton(false);
		}
	}, [data, geocoding, error]);

	function handleItemChange(ev) {
		const { name, value } = ev.target;

		setEditedItem(name);

		setFormState({
			...formState,
			[name]: {
				...formState[name],
				value
			}
		});
	}

	function handleItemBlur(ev) {
		const { name, value } = ev.target;

		setEditedItem(name);

		if (value.trim()) {
			try {
				getGeocode({
					variables: { address: formState[name].value }
				});
			} catch (err) {
				console.error(err);
			}
		} else {
			removeMapMarker(mapMarkers[name]);

			setMapMarkers({
				...mapMarkers,
				[name]: null
			});

			setFormState({
				...formState,
				[name]: {
					...formState[name],
					icon: getIcon(name, ICON_TYPES.blank)
				}
			});

			setEnableFormButton(false);
		}
	}

	async function handleClickCreateButton() {
		try {
			await mutate({
				variables: {
					dropoff: formState.dropoffAddress.value,
					pickup: formState.pickupAddress.value
				}
			});

			Object.keys(formState).forEach(key => {
				removeMapMarker(mapMarkers[key]);
			});

			setMapMarkers({
				pickupAddress: null,
				dropoffAddress: null
			});

			setFormState(INITIAL_FORM_STATE);
		} catch (err) {
			console.error(err);
		} finally {
			setEnableFormButton(false);
			setShowToaster(true);
		}
	}

	return (
		<main className="app">
			<div className="map" ref={mapRef} />
			{loading ? (
				<LoadingState />
			) : (
				<>
					<Form
						creating={creating}
						enableFormButton={enableFormButton}
						formState={formState}
						onClickCreateButton={handleClickCreateButton}
						onItemBlur={handleItemBlur}
						onItemChange={handleItemChange}
					/>
					{showToaster && (
						<Toaster onClick={() => setShowToaster(false)} />
					)}
				</>
			)}
		</main>
	);
}

export default App;
