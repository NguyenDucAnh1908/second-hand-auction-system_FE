import {apiSlice} from "../redux/api/apiSlice.js";

export const bidApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // API tạo bid
        createBid: builder.mutation({
            query: (bidData) => ({
                url: "/bids",
                method: "POST",
                body: bidData,
            }),
        }),


        getAllBids: builder.query({
            query: ({auctionId, page}) =>
                `/bids/history-bid/${auctionId}?page=${page}`,
        }),

        getWinBid: builder.query({
            query: (auctionId) =>
                `/bids/find-winner/${auctionId}`,
        }),

        getBidInfo: builder.query({
            query: (auctionId) =>
                `/bids/information-bid/${auctionId}`,
        }),

    }),
});

export const {
    useCreateBidMutation,
    useGetAllBidsQuery,
    useGetWinBidQuery,
    useGetBidInfoQuery,
} = bidApiSlice;
