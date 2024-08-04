import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";
import RangeGrid from "../components/RangeGrid";

const ArticleCategory = ({ type, title, searchKey, placeholder }) => {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/${type}`)
      .then((response) => {
        setArticles(response.data);
        console.log(`${title} articles fetched`, response.data);
      })
      .catch((error) => {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data");
      });
  }, [type, title]);

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredArticles = articles.filter((e) =>
    e[searchKey].toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <Header />
    
        <RangeGrid
          title={title}
          allValues={filteredArticles}
          error={error}
        />
      
    </>
  );
};

export default ArticleCategory;
