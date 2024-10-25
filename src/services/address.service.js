import { apiSlice } from "../redux/api/apiSlice.js";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // API tạo địa chỉ
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/address",
        method: "POST", // Phương thức POST
        body: addressData,
      }),
    }),

    // API lấy tất cả địa chỉ theo userId
    getUserAddress: builder.query({
      query: (userId) => `/address/user/${userId}`, // Mặc định là GET
    }),
  }),
});

// Xuất các hook
export const { useCreateAddressMutation } = addressApiSlice;
export const { useGetUserAddressQuery } = addressApiSlice;
