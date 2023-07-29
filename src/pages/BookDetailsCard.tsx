import { IBooks } from "../types/globalTypes";

interface IProps {
  book: IBooks;
}
export const BookDetailsCard = ({ book }: IProps) => {
  //   const { title, author, genre, image, publication_date, reviews } = book;
  return (
    <>
      <div>
        <p>HI</p>
        {/* <p>{title}</p>
        <p>{author}</p>
        <p>{genre}</p> */}
      </div>
    </>
  );
};
