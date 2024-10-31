import { apiSlice } from "../redux/api/apiSlice.js";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrder: builder.query({
            query: (paging) => ({
                url: "/orders/user", // Adjust URL if necessary
                method: "GET", // Ensure this is a GET request
                params: {
                    page: paging.page || 0, // Default to 0 if not provided
                    limit: paging.limit || 10, // Default to 10 if not provided
                },
            }),
            
        }),
    }),
});

// Export the hook for use in components
export const { useGetOrderQuery } = orderApiSlice;
