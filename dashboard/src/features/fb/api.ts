import { api } from '../../store/rtk/api'
import { addAccounts } from './Slices';

const fb = api.injectEndpoints({
    endpoints: (builder) => ({
        getFacebookAccounts: builder.query({
            query: () => '/group',
            async onQueryStarted(_params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addAccounts(data))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    }),
})


export const {
    useGetFacebookAccountsQuery
} = fb