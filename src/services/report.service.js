import { apiSlice } from "../redux/api/apiSlice.js";
export const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReport: builder.query({
            query: (paging) => ({
                url: "report/user",
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

export const {
    useGetReportQuery
} = reportApiSlice;
