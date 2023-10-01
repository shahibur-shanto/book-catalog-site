/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { useEffect, useState } from "react";
// import data from "../assets/data.json";
import Cards from "./Cards";
import { useGetHomeBooksQuery } from "../redux/features/books/booksApi";
import { IBooks } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading, isError } = useGetHomeBooksQuery(undefined);
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
      <div className="grid grid-cols-3 gap-4">
        {data.data.map((book: IBooks) => (
          <Cards book={book} key={book._id} />
        ))}
      </div>
    </>
  );
}
