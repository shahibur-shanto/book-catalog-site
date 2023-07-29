import { useState } from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Header";
import { useGetBooksQuery } from "../redux/features/books/booksApi";
import Cards from "./Cards";

function AllBooks() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
  if (!data?.data || !Array.isArray(data.data)) {
    return null; // or any appropriate fallback UI when data is not available
  }

  // let [genre, setGenre] = useState("");

  // let filterBook;

  // if (genre) {
  //   filterBook = data?.data?.filter((item) => item.genre === genre);
  // }
  // // else if () {
  // //   filterBook = data?.data?.filter(
  // //     (item: { price: number }) => item.price < priceRange
  // //   );
  // // }
  // else {
  //   filterBook = data?.data;
  // }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4">
        {data.data.map((book) => (
          <Cards book={book} key={book._id} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default AllBooks;
