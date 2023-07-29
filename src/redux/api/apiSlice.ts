import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-gilt.vercel.app",
    // baseUrl: "http://localhost:8923",
  }),
  tagTypes: ["comments"],
  endpoints: () => ({}),
});
