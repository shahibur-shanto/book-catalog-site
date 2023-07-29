import { IBooks } from "../types/globalTypes";

interface IProps {
  book: IBooks;
}

export default function Cards({ book }: IProps) {
  const { title, author, genre, image, publication_date } = book;
  let year = new Date(publication_date);
  year = year.getFullYear();

  const default_image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUHAVfCtF1azwHdv8EgZv2z69m8W5T8pHGw&usqp=CAU";
  return (
    <>
      <div className="m-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img
          className="w-16 md:w-32 lg:w-48 object-cover inline-flex items-center"
          // src="https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg"
          src={image !== "" ? image : default_image}
          alt="The Gret GatssBY"
        />
        <p className="m-2 mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          Title: {title}
        </p>
        <p className="m-2 mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          Author: {author}
        </p>
        <p className="m-2 mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          Genre: {genre}
        </p>
        <p className="m-2 mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
          Year: {year}
        </p>

        <a
          href={`/book-details/${book._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </a>
      </div>
    </>
  );
}
