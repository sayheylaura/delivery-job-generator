const ADDRESS_TYPES = {
	pickupAddress: 'pickupAddress',
	dropoffAddress: 'dropoffAddress'
};

const EVENTS = {
	EDIT: 'edit',
	MAP_LOAD_RESOLVE: 'map_load_resolve',
	MAP_LOAD_REJECT: 'map_load_reject'
};

const ICON_TYPES = {
	blank: 'blank',
	error: 'error',
	mapMarker: 'mapMarker',
	success: 'success'
};

const MAP_MARKER_TITLES = {
	pickupAddress: 'Pick up address',
	dropoffAddress: 'Drop off address'
};

const STATES = {
	idle: 'idle',
	map_loading: 'map_loading'
};

export { ADDRESS_TYPES, EVENTS, ICON_TYPES, MAP_MARKER_TITLES, STATES };
