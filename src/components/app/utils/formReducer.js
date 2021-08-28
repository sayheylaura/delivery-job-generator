import { EVENTS, STATES } from './constants';

function formReducer(state, event) {
	switch (state.status) {
		case STATES.map_loading:
			if (event.type === EVENTS.MAP_LOAD_RESOLVE) {
				return {
					...state,
					googleMap: event.payload,
					status: STATES.idle
				};
			}

			if (event.type === EVENTS.MAP_LOAD_REJECT) {
				return {
					...state,
					status: STATES.map_load_error
				};
			}
			break;

		default:
			return state;
	}
	return state;
}

export default formReducer;
