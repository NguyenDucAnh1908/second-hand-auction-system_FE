import {apiSlice} from "../redux/api/apiSlice.js";

export const auctionRegistrationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAuctionRegister: builder.query({
            query: (paging) => ({
                url: "auction-register/user",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            transformResponse: (response) => {
                return {
                    items: response.data.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalElements || 0,
                };
            },
        }),
        getAuctionRegisterDetail: builder.query({
            query: ({id}) => `/auction-register/detail/${encodeURIComponent(id)}`,
            transformResponse: (response) => response.data,
        }),

        getCheckAuctionRegister: builder.query({
            query: ({auctionId}) => `/auction-register/check-registration/${encodeURIComponent(auctionId)}`,
            transformResponse: (response) => response.data,
        }),

        auctionRegister: builder.mutation({
            query: (credentials) => ({
                url: "/auction-register",
                method: "POST",
                body: {...credentials},
            }),
        }),
    }),
});

export const {
    useGetAuctionRegisterQuery,
    useGetAuctionRegisterDetailQuery,
    useGetCheckAuctionRegisterQuery,
    useAuctionRegisterMutation
} = auctionRegistrationsApiSlice;