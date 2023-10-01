/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  usePostCommentsMutation,
  useSingleBookQuery,
} from "../redux/features/books/booksApi";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const BookDetail = () => {
  const { id } = useParams();
  const { data, refetch } = useSingleBookQuery(id);

  const { title, author, genre, publication_date, reviews } = data || {};

  const [reviewedBook, setReviewedBook] = useState({
    reviews: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewedBook((prev) => ({ ...prev, [name]: value }));
  };

  const [reviewBook, { isLoading, isError }] = usePostCommentsMutation();
  const navigate = useNavigate();

  const handleReview = (id: any) => {
    reviewBook({
      id,
      data: reviewedBook,
    })
      .unwrap()
      .then((response) => {
        console.log("Book updated successfully:", response);
        const notify = () => toast("Thanks for your review");
        refetch();
        notify();
        setReviewedBook({ reviews: "" });
        navigate(`/book-details/${id}`);
        // navigate(`/allbooks`);

        // navigate(`/review/${id}`);
        // Handle successful update
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        // Handle error
      });
  };

  const handleEdit = (id: any) => {
    navigate(`/book-edit/${id}`);
  };

  const [deleteBookMutation] = useDeleteBookMutation();

  const handleDelete = (id: any) => {
    console.log(id);
    console.log(deleteBookMutation(id));
    const result = confirm("Are you sure to delete?");
    if (result) {
      deleteBookMutation(id)
        .unwrap()
        .then((response) => {
          console.log("Book deleted successfully:", response);
          const notify = () => toast("Thanks for your review");
          notify();
          // navigate("/allbooks");
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          // Handle error
        });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
          <div className="p-4 border-b">
            <h2 className="text-2xl ">Books Details</h2>
          </div>
          <form>
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
                <p className="text-gray-600">Reviews</p>
                <ul>
                  {Array.isArray(reviews) &&
                    reviews.map((review, index) => (
                      <li key={index}>{review}</li>
                    ))}
                </ul>
              </div>

              <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="reviews"
                  placeholder="Input your Review"
                  onChange={handleInputChange}
                />

                <Link
                  to={`/book-details/${id}`}
                  onClick={() => handleReview(id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit Review
                </Link>
              </div>
              <div className="md:grid md:grid-cols-3 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                <button
                  onClick={() => handleEdit(id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Edit
                </button>

                <Link
                  to="/allbooks"
                  onClick={() => handleDelete(id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </Link>
                <Link
                  to="/addNewBook"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Book
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};
