import { gql, useApolloClient } from '@apollo/client';

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
	const client = useApolloClient();

	async function geocode(address) {
		const { data } = await client.query({
			query: GEOCODE_QUERY,
			variables: { address }
		});

		return data?.geocode;
	}

	return geocode;
}

export default useGeocodeQuery;
