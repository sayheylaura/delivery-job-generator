import { useReducer } from 'react';
import { EVENTS, STATES } from '../utils/constants';
import { formReducer } from '../utils';

const initialState = {
	googleMap: null,
	status: STATES.map_loading
};

function useForm() {
	const [state, dispatch] = useReducer(formReducer, initialState);
	const { googleMap, status } = state;

	function handleMapLoaded(gmap) {
		dispatch({ type: EVENTS.MAP_LOAD_RESOLVE, payload: gmap });
	}

	function handleMapLoadError() {
		dispatch({ type: EVENTS.MAP_LOAD_REJECT });
	}

	return {
		actions: {
			onMapLoaded: handleMapLoaded,
			onMapLoadError: handleMapLoadError
		},
		googleMap,
		status
	};
}

export default useForm;
