/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
    postComments: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["/"],
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
    addNewBook: builder.mutation({
      query: ({ data }) => ({
        url: `/create-book`,
        method: "POST",
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
  usePostCommentsMutation,
  useGetCommentQuery,
  useSearchBooksQuery,
  useEditBookMutation,
  useAddNewBookMutation,
} = BookApi;
