export interface IBooks {
  [x: string]: any;
  _id: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews: [string];
  image: string;
}
