// import { useEffect, useState } from "react";
// import data from "../assets/data.json";
import Cards from "./Cards";
import { useGetHomeQuery } from "../redux/features/home/homeApi";
// import { useAppDispatch } from "../redux/hooks";

export default function Home() {
  //   console.log(data);
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch("https://book-catalog-gilt.vercel.app/")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.data));
  // }, []);

  const { data, isLoading, isError } = useGetHomeQuery(undefined);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error occurred while fetching data.</p>;
  }
  if (!data?.data || !Array.isArray(data.data)) {
    return null; // or any appropriate fallback UI when data is not available
  }

  // const dispatch = useAppDispatch();
  // dispatch(data);
  // data.data.map((book) => console.log(book));
  // console.log(data);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data.data.map((book) => (
          <Cards book={book} key={book._id} />
        ))}
      </div>
    </>
  );
}
