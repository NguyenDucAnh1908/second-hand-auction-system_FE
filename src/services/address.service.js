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
      query: (userId) => `/address/user`, // Mặc định là GET
    }),


    //Delete
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}`,
        method: "DELETE",
      }),
    }),


    // API cập nhật địa chỉ
    updateAddress: builder.mutation({
      query: ({ addressId, addressData }) => ({
        url: `/address/${addressId}`,
        method: "PUT",
        body: addressData,
      }),
    }),


    // Assuming this is in your apiSlice file
    setStatus: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}/status`,
        method: "PATCH", // Use PATCH method
      }),
    }),



  }),
});

// Xuất các hook
export const { useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useSetStatusMutation }
  = addressApiSlice;

export const { useGetUserAddressQuery } = addressApiSlice;
