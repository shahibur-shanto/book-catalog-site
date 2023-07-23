import { api } from "../../api/apiSlice";

const HomeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHome: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetHomeQuery } = HomeApi;
