import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IBooks } from "../types/globalTypes";

const BookDetails = () => {
  const [data, setData] = useState<IBooks[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetch("../assets/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const product = data?.find((item) => item._id === Number(id));
  return <div>BookDetails</div>;
};

export default BookDetails;
