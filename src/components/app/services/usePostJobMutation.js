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
	const [postJob, { loading, error }] = useMutation(POST_JOB_MUTATION);

	return { postJob, loading, error };
}

export default usePostJobMutation;
