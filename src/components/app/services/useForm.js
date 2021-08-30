import { useEffect, useReducer, useState } from 'react';

import createMapMarker from './createMapMarker';
import removeMapMarker from './removeMapMarker';
import useGeocodeQuery from './useGeocodeQuery';
import usePostJobMutation from './usePostJobMutation';
import {
	ADDRESS_TYPES,
	EVENTS,
	ICON_TYPES,
	MAP_MARKER_TITLES,
	STATES
} from '../utils/constants';
import { formReducer, getIcon, validateForm } from '../utils';

const initialState = {
	form: {
		pickupAddress: {
			icon: getIcon(ADDRESS_TYPES.pickupAddress, ICON_TYPES.blank),
			isValid: false,
			mapMarker: null,
			value: ''
		},
		dropoffAddress: {
			icon: getIcon(ADDRESS_TYPES.dropoffAddress, ICON_TYPES.blank),
			isValid: false,
			mapMarker: null,
			value: ''
		}
	},
	googleMap: null,
	showToaster: false,
	status: STATES.map_loading
};

function useForm() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { form, googleMap, showToaster, status } = state;

	const [enableFormButton, setEnableFormButton] = useState(false);
	const [geocodeTimeout, setGeocodeTimeout] = useState(null);

	const geocode = useGeocodeQuery();
	const { postJob } = usePostJobMutation();

	useEffect(() => {
		const validationTimeout = setTimeout(() => {
			const isFormValid = validateForm(form);
			setEnableFormButton(isFormValid);
		}, 500);

		return () => clearTimeout(validationTimeout);
	}, [form]);

	useEffect(() => {
		return () => clearTimeout(geocodeTimeout);
	}, [geocodeTimeout]);

	function handleMapLoaded(gmap) {
		dispatch({ type: EVENTS.MAP_LOAD_RESOLVE, payload: gmap });
	}

	function handleMapLoadError() {
		dispatch({ type: EVENTS.MAP_LOAD_REJECT });
	}

	async function setMapMarker(data, name) {
		dispatch({ type: EVENTS.MAP_CREATE_MARKER });
		const { latitude: lat, longitude: lng } = data;

		try {
			const mapMarker = await createMapMarker(
				getIcon(name, ICON_TYPES.mapMarker),
				googleMap,
				{ lat, lng },
				MAP_MARKER_TITLES[name]
			);

			const successIcon = getIcon(name, ICON_TYPES.success);

			dispatch({
				type: EVENTS.MAP_CREATE_MARKER_RESOLVE,
				payload: { name, mapMarker, successIcon }
			});
		} catch {
			dispatch({ type: EVENTS.MAP_CREATE_MARKER_REJECT });
		}
	}

	async function getGeocode(name, value) {
		dispatch({ type: EVENTS.GEOCODE });

		try {
			const data = await geocode(value);
			dispatch({ type: EVENTS.GEOCODE_RESOLVE });
			setMapMarker(data, name);
		} catch {
			removeMapMarker(form[name].mapMarker);

			const errorIcon = getIcon(name, ICON_TYPES.error);

			dispatch({
				type: EVENTS.GEOCODE_REJECT,
				payload: { errorIcon, name }
			});
		}
	}

	function handleItemChange(name, value) {
		if (geocodeTimeout) clearTimeout(geocodeTimeout);

		dispatch({ type: EVENTS.EDIT, payload: { name, value } });

		setGeocodeTimeout(
			setTimeout(() => {
				if (value.trim()) {
					getGeocode(name, value);
				} else {
					removeMapMarker(form[name].mapMarker);

					const blankIcon = getIcon(name, ICON_TYPES.blank);

					dispatch({
						type: EVENTS.CLEAR_FIELD,
						payload: { blankIcon, name }
					});
				}
			}, 500)
		);
	}

	async function handleClickCreateButton() {
		dispatch({ type: EVENTS.JOB_CREATE });

		try {
			await postJob({
				variables: {
					dropoff: form.dropoffAddress.value,
					pickup: form.pickupAddress.value
				}
			});

			Object.keys(form).forEach(key => {
				removeMapMarker(form[key].mapMarker);
			});

			const resetFormState = initialState.form;

			dispatch({
				type: EVENTS.JOB_CREATE_RESOLVE,
				payload: resetFormState
			});
		} catch {
			dispatch({ type: EVENTS.JOB_CREATE_REJECT });
		} finally {
			setEnableFormButton(false);
		}
	}

	function handleClickToaster() {
		dispatch({ type: EVENTS.TOASTER_CLOSE });
	}

	return {
		actions: {
			onClickCreateButton: handleClickCreateButton,
			onClickToaster: handleClickToaster,
			onItemChange: handleItemChange,
			onMapLoaded: handleMapLoaded,
			onMapLoadError: handleMapLoadError
		},
		enableFormButton,
		form,
		showToaster,
		status
	};
}

export default useForm;
