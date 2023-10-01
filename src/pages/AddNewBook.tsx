/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import {
  useAddNewBookMutation,
  useGetHomeBooksQuery,
} from "../redux/features/books/booksApi";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "../layout/Header";
import Footer from "../layout/Footer";

const AddNewBook = () => {
  const [addedNewBook, setAddedNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_date: "",
  });

  const [addNewBook, { isLoading, isError }] = useAddNewBookMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddedNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const notify = () => toast("Your book added Successfully");
  const { refetch } = useGetHomeBooksQuery(undefined);

  const handleSubmit = () => {
    addNewBook({ data: addedNewBook })
      .unwrap()
      .then((response) => {
        console.log("Book added successfully:", response);
        addedNewBook.title = "";
        addedNewBook.author = "";
        addedNewBook.genre = "";
        addedNewBook.publication_date = "";
        refetch();
        notify();
        // Handle successful update
      })
      .catch((error) => {
        console.error("Error adding book:", error);
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
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-black">
            Add a new Book
          </h2>
          <form>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Title
                </label>
                <input
                  value={addedNewBook.title}
                  onChange={handleInputChange}
                  type="text"
                  name="title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type Title"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Author
                </label>
                <input
                  value={addedNewBook.author}
                  onChange={handleInputChange}
                  type="text"
                  name="author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Author"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Genre
                </label>
                <input
                  value={addedNewBook.genre}
                  onChange={handleInputChange}
                  type="text"
                  name="genre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Genre"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Publication Date
                </label>
                <input
                  value={addedNewBook.publication_date}
                  onChange={handleInputChange}
                  type="text"
                  name="publication_date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Publication Date"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
            <ToastContainer />
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddNewBook;
