import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

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
    
        <CardGrid
          title={title}
          value={filter}
          onChange={handleFilterChange}
          placeholder={placeholder}  // Pass the placeholder prop here so that we can give it's value later in a Component
          error={error}
          filteredArticles={filteredArticles}
        />
      
    </>
  );
};

export default ArticleCategory;
