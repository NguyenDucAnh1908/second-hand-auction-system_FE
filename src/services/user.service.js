import {apiSlice} from "../redux/api/apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/user/getUser",
            transformResponse: (response) => response.users,
        }),
        getUserById: builder.query({
            query: () => "/user",
            transformResponse: (response) => response.data,
        }),

        changePassword: builder.mutation({
            query: (credentials) => ({
                url: "/user/changePassword",
                method: "PATCH",
                body: {...credentials},
            }),
        }),

        updateUser: builder.mutation({
            query: (credentials) => ({
                url: "/user",
                method: "PUT",
                body: {...credentials},
            }),
        }),

    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useChangePasswordMutation,
    useUpdateUserMutation,
} = userApiSlice;
