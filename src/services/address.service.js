import { apiSlice } from "../redux/api/apiSlice.js";


export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/address",  
        method: "POST",
        body: addressData,      
      }),
    }),
  }),
});

export const { useCreateAddressMutation } = addressApiSlice;

  

