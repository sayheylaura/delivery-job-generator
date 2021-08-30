import { EVENTS, STATES } from './constants';

function handleItemChangeEvent(state, event) {
	const { name, value } = event.payload;

	return {
		...state,
		form: {
			...state.form,
			[name]: {
				...state.form[name],
				value
			}
		},
		status: STATES.idle
	};
}

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

		case STATES.idle:
			if (event.type === EVENTS.EDIT) {
				return handleItemChangeEvent(state, event);
			}
			break;

		default:
			return state;
	}
	return state;
}

export default formReducer;
