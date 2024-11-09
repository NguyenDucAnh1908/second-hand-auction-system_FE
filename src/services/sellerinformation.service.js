import { apiSlice } from "../redux/api/apiSlice.js";

export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    getSellerInformationByAuctionId: builder.query({
      query: (auctionId) => `/seller-information/auction/${auctionId}`, // Đường dẫn API
    }),


    getSellerInformationByUserId: builder.query({
      query: (userId) => `/seller-information/user/${userId}`, // New user-based API path
    }),

  }),
});

export const
  { useGetSellerInformationByAuctionIdQuery,
    useGetSellerInformationByUserIdQuery
  } = sellerApiSlice;
