/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/booksApi";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id: bookId } = useParams();
  const { data, refetch } = useSingleBookQuery(bookId);
  const { title, author, genre, publication_date } = data || {};

  const [updatedBook, setUpdatedBook] = useState({
    title: title,
    author: author,
    genre: genre,
    publication_date: publication_date,
  });

  const [updateBook, { isLoading, isError }] = useEditBookMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateBook({ id: bookId, data: updatedBook })
      .unwrap()
      .then((response) => {
        console.log("Book updated successfully:", response);
        refetch();
        // Handle successful update
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        // Handle error
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while updating the book.</div>;
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <form>
          <div class="mb-6">
            <label
              for="Title"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              value={updatedBook.title}
              onChange={handleInputChange}
              type="text"
              name="title"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label
              for="author"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author
            </label>
            <input
              value={updatedBook.author}
              onChange={handleInputChange}
              type="text"
              name="author"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label
              for="Genre"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Genre
            </label>
            <input
              value={updatedBook.genre}
              onChange={handleInputChange}
              type="text"
              name="genre"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label
              for="Genre"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Publication Date
            </label>
            <input
              value={updatedBook.publication_date}
              onChange={handleInputChange}
              type="text"
              name="publication_date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBook;
