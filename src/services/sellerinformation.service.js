import { apiSlice } from "../redux/api/apiSlice.js";

export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellerInformationByAuctionId: builder.query({
      query: (auctionId) => `/seller-information/auction/${auctionId}`, // Đường dẫn API
    }),
  }),
});

export const { useGetSellerInformationByAuctionIdQuery } = sellerApiSlice;
