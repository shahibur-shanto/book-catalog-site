/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Cards from "./Cards";
import { useFilterBooksQuery } from "../redux/features/books/booksApi";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";
import { IBooks } from "../types/globalTypes";
import { useLocation } from "react-router-dom";

export default function FilterBook() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");
  const year = searchParams.get("year");

  const { data, isLoading, isError, refetch } = useFilterBooksQuery({
    genre: genre,
    year: year,
  });

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (isError) {
  //   return <p>Error occurred while fetching data.</p>;
  // }

  const fetchData = async () => {
    try {
      await refetch(); // Wait for the refetch to complete
      // Check for loading state again if needed
      if (isLoading) {
        return <p>Loading...</p>;
      }
      // Check for error state again if needed
      if (isError) {
        return <p>Error occurred while fetching data.</p>;
      }
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  };
  fetchData();
  if (!data?.data || !Array.isArray(data?.data)) {
    return null; // or any appropriate fallback UI when data is not available
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-4">
        {data.data.map((book: IBooks) => (
          <Cards book={book} key={book._id} />
        ))}
      </div>

      <Footer />
    </>
  );
}
