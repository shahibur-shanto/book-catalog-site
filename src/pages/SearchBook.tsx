/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Cards from "./Cards";
import {
  useFilterBooksQuery,
  useSearchBooksQuery,
} from "../redux/features/books/booksApi";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams } from "react-router-dom";
import { IBooks } from "../types/globalTypes";

export default function SearchBook() {
  const { searchText } = useParams();

  const { data, isLoading, isError } = useSearchBooksQuery(searchText);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
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
