import React, { useEffect, useRef } from 'react';

import Form from '../form';
import LoadingState from '../loadingState';
import Toaster from '../toaster';

import { initializeMap, useForm } from './services';
import { STATES } from './utils/constants';

import './app.sass';

function App() {
	const {
		actions: {
			onClickCreateButton,
			onClickToaster,
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
			initializeMap(mapRef.current).then(map => {
				onMapLoaded(map);
			});
		} catch {
			onMapLoadError();
		}
	}, []);

	function handleItemChange(ev) {
		const { name, value } = ev.target;

		onItemChange(name, value);
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
						onItemChange={handleItemChange}
					/>
					{showToaster && <Toaster onClick={onClickToaster} />}
				</>
			)}
		</main>
	);
}

export default App;
