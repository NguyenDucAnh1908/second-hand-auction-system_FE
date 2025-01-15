import { apiSlice } from "../redux/api/apiSlice";

export const auctionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        auctionCreate: builder.mutation({
            query: (credentials) => ({
                url: "/auctions",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        getAuctionById: builder.query({
            query: (id) => ({
                url: `/auctions/${encodeURIComponent(id)}`,
            }),

        }),

        getAuctionCreatedToday: builder.query({
            query: () => '/auctions/count-today', // Nếu baseUrl đã được cấu hình
            transformResponse: (response) => response, // Không sửa đổi kết quả trả về
        }),

        getAuctionCreatedMonth: builder.query({
            query: () => '/auctions/count-month',
        }),


        updateAuction: builder.mutation({
            query: ({ auctionId, auctionData }) => ({
                url: `/auctions/${auctionId}`,
                method: "PUT",
                body: auctionData,
            }),
        }),

        updateStatusAuction: builder.mutation({
            query: ({ auctionId }) => ({
                url: `/auctions/update/${auctionId}`,
                method: "PUT",
            }),
        }),

        updateStatusAuction2: builder.mutation({
            query: ({ auctionId }) => ({
                url: `/auctions/update-closed/${auctionId}`,
                method: "PUT",
            }),
        })

    }),
});

export const {
    useAuctionCreateMutation,
    useGetAuctionByIdQuery,
    useGetAuctionCreatedTodayQuery,
    useGetAuctionCreatedMonthQuery,
    useUpdateAuctionMutation,
    useUpdateStatusAuctionMutation,
    useUpdateStatusAuction2Mutation,
} = auctionApiSlice;

