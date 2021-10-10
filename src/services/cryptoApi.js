import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryprtoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "ae3a33e158msh50158fa5ff1cafap11fb52jsnd55cfd3e38a3",
};
const baseUrl = "https://coinranking1.p.rapidapi.com/";

// request Obj
const createRequest = (url) => ({ url, headers: cryprtoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  // function return an object
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ id, timePeriod }) =>
        createRequest(`/coin/${id}/history/${timePeriod}`),
    }),
  }),
});
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
