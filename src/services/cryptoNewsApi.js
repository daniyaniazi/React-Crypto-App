import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryprtoNewsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "ae3a33e158msh50158fa5ff1cafap11fb52jsnd55cfd3e38a3",
};
const baseUrl = "https://coinranking1.p.rapidapi.com";

// request Obj
const createRequest = (url) => ({ url, headers: cryprtoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  // function return an object
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ category, count }) =>
        createRequest(
          `/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});
const { useGetCryptoNewsQuery } = cryptoNewsApi;
export default useGetCryptoNewsQuery;
