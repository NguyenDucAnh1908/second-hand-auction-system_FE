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
            query: (id) => ({
                url: `/kyc/${id}`, 
            }),
            transformResponse: (response) => {
                console.log(response); 
                return response || {}; 
            },
        }),

        updateKyc: builder.mutation({
            query: ({ kycId, verifiedBy, reason }) => {
                const body = {
                    verifiedBy,
                    reason,
                    status: 'PENDING',
                };
                console.log('Đang gửi cập nhật KYC:', body); 
                return {
                    url: `/kyc/${kycId}`,
                    method: 'PUT',
                    body,
                };
            },
        }),
    }),
});

// Xuất hook cho component
export const { useGetKYCItemsQuery, useGetKYCByIdQuery, useUpdateKycMutation } = kycApiSlice;
