import {apiSlice} from "../redux/api/apiSlice.js";

export const transactionWalletApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTransactionWallet: builder.query({
            query: (paging) => ({
                url: "transactionWallet/get-transaction-wallet",
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
    }),
});

export const {useGetTransactionWalletQuery} = transactionWalletApiSlice;