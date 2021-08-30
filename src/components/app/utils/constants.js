const ADDRESS_TYPES = {
	pickupAddress: 'pickupAddress',
	dropoffAddress: 'dropoffAddress'
};

const EVENTS = {
	CLEAR_FIELD: 'clear_field',
	EDIT: 'edit',
	GEOCODE: 'geocode',
	GEOCODE_REJECT: 'geocode_reject',
	GEOCODE_RESOLVE: 'geocode_resolve',
	JOB_CREATE: 'job_create',
	JOB_CREATE_REJECT: 'job_create_reject',
	JOB_CREATE_RESOLVE: 'job_create_resolve',
	MAP_CREATE_MARKER: 'map_create_marker',
	MAP_CREATE_MARKER_REJECT: 'map_create_marker_reject',
	MAP_CREATE_MARKER_RESOLVE: 'map_create_marker_resolve',
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
	geocode_error: 'geocode_error',
	geocode_success: 'geocode.success',
	geocoding: 'geocoding',
	idle: 'idle',
	job_create_error: 'job_create_error',
	job_create_success: 'job_create_success',
	job_creating: 'job_creating',
	map_create_marker_error: 'map_create_marker_error',
	map_create_marker_success: 'map_create_marker_success',
	map_creating_marker: 'map_creating_marker',
	map_loading: 'map_loading',
	map_load_error: 'map_load_error'
};

export { ADDRESS_TYPES, EVENTS, ICON_TYPES, MAP_MARKER_TITLES, STATES };
