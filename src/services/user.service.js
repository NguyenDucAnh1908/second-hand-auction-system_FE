import { apiSlice } from "../redux/api/apiSlice.js";

// export const userApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => {
//         getUsers: builder.query({
//             query: () => "/user/getUser",
//             transformResponse: (response) => response.data,
//         });
//     }
// });
// export const {useGetUsersQuery} = userApiSlice;
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/getUser",
      //keepUnusedDataFor: 5,
      transformResponse: (response) => response.users,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
