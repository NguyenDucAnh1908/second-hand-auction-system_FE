import { apiSlice } from "../redux/api/apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/getUser",
      transformResponse: (response) => response.users,
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      transformResponse: (response) => {
        if (response.status === "OK") {
          return {
            fullName: response.data.fullName,
            email: response.data.email,
            avatar: response.data.avatar,
            role: response.data.role,
            status: response.data.status,
          };
        }
        return null;
      },
    }),

    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/user/changePassword",
        method: "PATCH",
        body: {...credentials},
      }),
    }),

  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useChangePasswordMutation } = userApiSlice;
