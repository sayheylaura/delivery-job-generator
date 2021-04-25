import { useLazyQuery, gql } from '@apollo/client';

const GEOCODE_QUERY = gql`
	query geocode($address: String!) {
		geocode(address: $address) {
			address
			latitude
			longitude
		}
	}
`;

function useGeocodeQuery() {
	const [getGeocode, { data, loading, error }] = useLazyQuery(GEOCODE_QUERY);

	return { getGeocode, data, loading, error };
}

export default useGeocodeQuery;
