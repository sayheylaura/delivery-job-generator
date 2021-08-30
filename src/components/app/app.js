import React, { useEffect, useRef } from 'react';

import Form from '../form';
import LoadingState from '../loadingState';
import Toaster from '../toaster';

import { initializeGoogleMap, useForm } from './services';
import { STATES } from './utils/constants';

import './app.sass';

function App() {
	const {
		actions: {
			onClickCreateButton,
			onClickToaster,
			onItemBlur,
			onItemChange,
			onMapLoaded,
			onMapLoadError
		},
		enableFormButton,
		form,
		showToaster,
		status
	} = useForm();

	const loading = status === STATES.map_loading;
	const creating = status === STATES.job_creating;

	const mapRef = useRef();

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
						onClickCreateButton={onClickCreateButton}
						onItemBlur={handleItemBlur}
						onItemChange={handleItemChange}
					/>
					{showToaster && <Toaster onClick={onClickToaster} />}
				</>
			)}
		</main>
	);
}

export default App;
