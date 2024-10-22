import {apiSlice} from "../redux/api/apiSlice.js";

export const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getItems: builder.query({
            query: (paging) => ({
                url: "item/product-appraisal",
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
        getFeatureItems: builder.query({
            query: () => "item/top-10-featured-item",
            transformResponse: (response) => response.data,
        }),

        getItemsFilter: builder.query({
            query: (filters) => ({
                url: "item",
                params: {
                    keyword: filters.keyword || "",
                    page: filters.page || 0,
                    limit: filters.limit || 8,
                    minPrice: filters.min || 0,
                    maxPrice: filters.max || 1600000,
                    scIds: filters.scIds?.join(",") || "",
                }
            }),
            transformResponse: (response) => {
                return {
                    item: response.data.data || [],
                    totalPages: response.data.totalPages || 0,
                    totalProducts: response.data.totalProducts || 0,
                };
            },
        })
    }),
});

export const {useGetItemsQuery, useGetFeatureItemsQuery, useGetItemsFilterQuery} = itemApiSlice;