import { apiSlice } from "../redux/api/apiSlice.js"; 

export const auctionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctionById: builder.query({
      query: (id) => ({
        url: `/auctions/${encodeURIComponent(id)}`,
      }),
  
    }),
  }),
});

export const { useGetAuctionByIdQuery } = auctionApiSlice; 
