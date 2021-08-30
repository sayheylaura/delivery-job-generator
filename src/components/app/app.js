import React, { useEffect, useRef, useState } from 'react';

import Form from '../form';
import LoadingState from '../loadingState';
import Toaster from '../toaster';

import {
	initializeGoogleMap,
	removeMapMarker,
	useForm,
	usePostJobMutation
} from './services';
import { ADDRESS_TYPES, ICON_TYPES, STATES } from './utils/constants';
import { getIcon } from './utils';

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
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [mapMarkers, setMapMarkers] = useState({
		pickupAddress: null,
		dropoffAddress: null
	});
	const [showToaster, setShowToaster] = useState(false);

	const {
		actions: { onItemBlur, onItemChange, onMapLoaded, onMapLoadError },
		enableFormButton,
		form,
		status
	} = useForm();

	const loading = status === STATES.map_loading;

	const mapRef = useRef();

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

	function handleItemChange(ev) {
		const { name, value } = ev.target;

		onItemChange(name, value);
	}

	function handleItemBlur(ev) {
		const { name, value } = ev.target;

		onItemBlur(name, value);
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
						form={form}
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
