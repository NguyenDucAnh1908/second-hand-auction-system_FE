import {apiSlice} from "../redux/api/apiSlice";

export const auctionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        auctionCreate: builder.mutation({
            query: (credentials) => ({
                url: "/auctions",
                method: "POST",
                body: {...credentials},
            }),
        }),
    }),
});

export const {
    useAuctionCreateMutation,
} = auctionApiSlice;