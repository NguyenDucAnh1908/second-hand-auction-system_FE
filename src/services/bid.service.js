import { apiSlice } from "../redux/api/apiSlice.js";

export const bidApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // API tạo bid
    createBid: builder.mutation({
      query: (bidData) => ({
        url: "/bids", // Đường dẫn cho API tạo bid
        method: "POST", // Phương thức POST
        body: bidData,
      }),
    }),


}),
});

export const {
    useCreateBidMutation
  } = bidApiSlice;