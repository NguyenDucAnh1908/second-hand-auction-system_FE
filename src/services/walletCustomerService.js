import {apiSlice} from "@/redux/api/apiSlice.js";

export const walletCustomerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        depositUser: builder.mutation({
            query: (credentials) => ({
                url: "/walletCustomer/deposit",
                method: "POST",
                body: {...credentials},
            }),
        }),

        checkDepositUser: builder.mutation({
            query: (orderCode) => ({
                url: `/walletCustomer/${encodeURIComponent(orderCode)}`,
                method: "GET",
            }),
        }),
    }),
});

export const {useDepositUserMutation, useCheckDepositUserMutation} = walletCustomerApiSlice;