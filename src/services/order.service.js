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

        createOrder: builder.mutation({
            query: (credentials) => ({
                url: "/orders",
                method: "POST",
                body: { ...credentials },
            }),
        }),

        getOrderAdmin: builder.query({
            query: (paging) => ({
                url: '/orders',
                params: {
                    page: paging.page || 0,       // Default to 0 if no page is provided
                    limit: paging.limit || 10,    // Default to 10 if no limit is provided
                    status: paging.status,        // Pass status if available
                },
            }),
        }),
        
    
    }),
});

// Export the hook for use in components
export const { useGetOrderQuery, useCreateOrderMutation, useGetOrderAdminQuery } = orderApiSlice;
 