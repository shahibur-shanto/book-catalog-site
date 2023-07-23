import { api } from "../../api/apiSlice";

const BookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ["comments"],
    }),
    postCommets: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleProductQuery,
  usePostCommetsMutation,
  useGetCommentQuery,
} = BookApi;
