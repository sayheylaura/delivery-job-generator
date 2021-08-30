import { useReducer } from 'react';
import { ADDRESS_TYPES, EVENTS, ICON_TYPES, STATES } from '../utils/constants';
import { formReducer, getIcon } from '../utils';

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
	status: STATES.map_loading
};

function useForm() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { form, googleMap, status } = state;

	function handleMapLoaded(gmap) {
		dispatch({ type: EVENTS.MAP_LOAD_RESOLVE, payload: gmap });
	}

	function handleMapLoadError() {
		dispatch({ type: EVENTS.MAP_LOAD_REJECT });
	}

	function handleItemChange(name, value) {
		dispatch({ type: EVENTS.EDIT, payload: { name, value } });
	}

	return {
		actions: {
			onItemChange: handleItemChange,
			onMapLoaded: handleMapLoaded,
			onMapLoadError: handleMapLoadError
		},
		form,
		googleMap,
		status
	};
}

export default useForm;
