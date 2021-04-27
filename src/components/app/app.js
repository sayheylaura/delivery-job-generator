import React, { useEffect, useRef, useState } from 'react';
import Form from '../form';
import LoadingState from '../loadingState';
import Toaster from '../toaster';
import {
	createMapMarker,
	initializeGoogleMap,
	useGeocodeQuery,
	usePostJobMutation
} from './services';
import {
	ADDRESS_TYPES,
	ICON_TYPES,
	MAP_MARKER_TITLES
} from './utils/constants';
import { getIcon, isAddressValid } from './utils';
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
	const [initialLoading, setInitialLoading] = useState(true);
	const [map, setMap] = useState(null);
	const [mapMarkers, setMapMarkers] = useState({
		pickupAddress: null,
		dropoffAddress: null
	});
	const [showToaster, setShowToaster] = useState(false);

	const mapRef = useRef();

	const { getGeocode, data, loading, error } = useGeocodeQuery();
	const { mutate, loading: creating } = usePostJobMutation();

	function validateForm() {
		const isValid = Object.keys(formState).every(key => {
			const { value } = formState[key];
			return !!(value.trim() && isAddressValid(value));
		});

		if (isValid) {
			return setEnableFormButton(true);
		}
		return setEnableFormButton(false);
	}

	useEffect(() => {
		try {
			initializeGoogleMap(mapRef.current).then(gmap => {
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

				if (validateForm(formState)) {
					setEnableFormButton(true);
				}
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
			setEnableFormButton(false);
		}
	}, [data, loading, error]);

	const handleItemBlur = ev => {
		const { name, value } = ev.target;
		setEditedItem(name);
		if (value.trim()) {
			return getGeocode({
				variables: { address: formState[name].value }
			});
		}
		return setEnableFormButton(false);
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
			setEnableFormButton(false);
		}
	};

	const handleClickCreateButton = async () => {
		try {
			await mutate({
				variables: {
					dropoff: formState.dropoffAddress.value,
					pickup: formState.pickupAddress.value
				}
			});

			Object.keys(formState).forEach(key => {
				return mapMarkers[key] && mapMarkers[key].setMap(null);
			});

			setFormState(INITIAL_FORM_STATE);
		} catch (err) {
			console.error(err);
		} finally {
			setEnableFormButton(false);
			setShowToaster(true);
		}
	};

	return (
		<main className="app">
			<div className="map" ref={mapRef} />
			{initialLoading ? (
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
