import { useMutation, gql } from '@apollo/client';

const POST_JOB_MUTATION = gql`
	mutation postJob($pickup: String!, $dropoff: String!) {
		job(pickup: $pickup, dropoff: $dropoff) {
			pickup {
				address
				latitude
				longitude
			}
			dropoff {
				address
				latitude
				longitude
			}
		}
	}
`;

function usePostJobMutation() {
	const [mutate, { loading, error }] = useMutation(POST_JOB_MUTATION);

	return { mutate, loading, error };
}

export default usePostJobMutation;
