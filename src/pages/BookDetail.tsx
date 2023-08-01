/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate, useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/books/booksApi";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";

export const BookDetail = () => {
  const { id } = useParams();
  // console.log(id);
  const { data, isLoading, isError } = useSingleBookQuery(id);

  const navigate = useNavigate();
  const handleEdit = (id: any) => {
    navigate(`/book-edit/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
  const { title, author, genre, publication_date } = data || {};
  console.log(data);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-2xl ">Books Details</h2>
          </div>
          <div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Title</p>
              <p>{title}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Author</p>
              <p>{author}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Genre</p>
              <p>{genre}</p>
            </div>
            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600">Publication Date</p>
              <p>{publication_date}</p>
            </div>

            <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Input your Review"
              />

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Review
              </button>
            </div>
            <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <button
                onClick={() => handleEdit(id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit
              </button>

              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Book
              </button>
            </div>
            <div className="md:grid md:grid-cols-1 m-2 py-2 px-4 rounded bg-cyan-500 hover:bg-cyan-600">
              Reviews:
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
