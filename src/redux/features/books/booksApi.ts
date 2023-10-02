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
    filterBooks: builder.query({
      query: (params) => {
        // Extract the filter criteria from 'params'
        const { genre, year } = params;

        // Build the query string with the filter criteria
        let queryString = "/filter?";

        // Add 'genre' if provided
        if (genre) {
          queryString += `genre=${genre}&`;
        }

        // Add 'year' if provided
        if (year) {
          queryString += `year=${year}&`;
        }

        // Remove the trailing '&' if it exists
        if (queryString.endsWith("&")) {
          queryString = queryString.slice(0, -1);
        }

        return queryString;
      },
    }),
    postComments: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["/"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
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
  useFilterBooksQuery,
  useSearchBooksQuery,
  useEditBookMutation,
  useAddNewBookMutation,
  useDeleteBookMutation,
} = BookApi;
