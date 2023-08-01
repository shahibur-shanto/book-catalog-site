import { api } from "../../api/apiSlice";

const BookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/allbooks",
    }),
    getHomeBooks: builder.query({
      query: () => "/",
    }),
    searchBooks: builder.query({
      query: (searchText) => `/search/${searchText}`,
    }),
    singleBook: builder.query({
      query: (id) => `/book-details/${id}`,
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

    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book-edit/${id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: [{ type: "Book", id }],
      invalidatesTags: ["/"],
    }),
  }),
});

export const {
  useGetHomeBooksQuery,
  useGetBooksQuery,
  useSingleBookQuery,
  usePostCommetsMutation,
  useGetCommentQuery,
  useSearchBooksQuery,
  useEditBookMutation,
} = BookApi;
