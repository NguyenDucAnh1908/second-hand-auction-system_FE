import {apiSlice} from "../redux/api/apiSlice.js";

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

        getAllReport: builder.query({
            query: (paging) => ({
                url: "report",
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

        createReport: builder.mutation({
            query: (credentials) => ({
                url: "/report",
                method: "POST",
                body: {...credentials},
            }),
        }),

        updateReport: builder.mutation({
            query: ({ id, ...credentials }) => ({
                url: `/report/${id}`, // Lấy id từ payload để xây dựng URL
                method: "PUT",
                body: credentials, // Truyền phần còn lại của payload vào body
            }),
        }),


        // updateReport: builder.mutation({
        //     query: (credentials, id) => ({
        //         url: `/report/${id}`,
        //         method: "PUT",
        //         body: {...credentials},
        //     }),
        // }),
    }),

});

export const {
    useGetReportQuery,
    useGetAllReportQuery,
    useCreateReportMutation,
    useUpdateReportMutation,
} = reportApiSlice;
