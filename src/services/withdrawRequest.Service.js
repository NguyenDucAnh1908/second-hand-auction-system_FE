import { apiSlice } from "@/redux/api/apiSlice.js";

export const withdrawApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResultVNPay: builder.query({
            query: (params) => ({
                url: `/withdrawRequest/results?${new URLSearchParams(params).toString()}`,
                method: "GET",
            }),
        }),

        getWithdraws: builder.query({
            query: (paging) => ({
              url: '/withdrawRequest',
              params: {
                page: paging.page || 0,  // Default to page 0
                limit: paging.limit || 10, // Default to limit 10
              },
            }),
        }),
    }),
    
});

export const { useGetResultVNPayQuery, useGetWithdrawsQuery } = withdrawApiSlice;
