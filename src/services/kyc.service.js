// src/services/kyc.service.js

import { apiSlice } from "../redux/api/apiSlice.js";

export const kycApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getKYCItems: builder.query({
            query: (paging) => ({
                url: "/kyc",
                params: {
                    page: paging.page || 0,
                    limit: paging.limit || 10,
                },
            }),
            providesTags: ['Orders'],
            transformResponse: (response) => {
                console.log(response.data);

                return {
                    data: response.data || [],
                    totalPages: response.totalPages || 0,
                    totalProducts: response.totalElements || 0,
                };
            },
        }),

        getKYCById: builder.query({
            query: (id) => `kyc/${id}`,
            providesTags: ['Orders'],
        }),

        updateKyc: builder.mutation({
            query: ({ kycId, kycData }) => ({
                url: `/kyc/${kycId}`,
                method: "PUT",
                body: kycData,
            }),
            invalidatesTags: ['kyc'],
        }),

        createKyc: builder.mutation({
            query: (kycData) => ({
                url: "/kyc",
                method: "POST",
                body: kycData,
            }),
            invalidatesTags: ['kyc'],
        }),

        getKYCByUser: builder.query({
            query: () => `/kyc/user`,
            providesTags: ['Orders'],
        }),

        updateKYCByUser: builder.mutation({
            query: (kycData) => ({
                url: "/kyc/update-profileKyc",
                method: "PUT",
                body: kycData,
            }),
            invalidatesTags: ['kyc'],
        }),
    }),
})


// Xuất hook cho component
export const { useGetKYCItemsQuery, useGetKYCByIdQuery, useUpdateKycMutation, useCreateKycMutation, useGetKYCByUserQuery , useUpdateKYCByUserMutation } = kycApiSlice;
