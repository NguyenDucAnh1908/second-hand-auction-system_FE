import { apiSlice } from "@/redux/api/apiSlice.js";

export const withdrawApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResultVNPay: builder.query({
            query: (params) => ({
                url: `/withdrawRequest/results?${new URLSearchParams(params).toString()}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetResultVNPayQuery } = withdrawApiSlice;
