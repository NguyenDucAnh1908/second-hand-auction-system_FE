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

        getAuctionById: builder.query({
            query: (id) => ({
              url: `/auctions/${encodeURIComponent(id)}`,
            }),
        
          }),
    }),
});

export const {
    useAuctionCreateMutation,
    useGetAuctionByIdQuery
} = auctionApiSlice;

