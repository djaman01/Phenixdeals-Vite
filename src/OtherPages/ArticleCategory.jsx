import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

const ArticleCategory = ({ type, title, searchKey }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("");

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
            ? `${error.response.status}: ${error.response.data.message}`
            : `Error: ${error.message}`,
        );
        setError("An error occurred while fetching data");
      });
  }, [type, title]);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredArticles = articles.filter((e) =>
    e[searchKey].toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <>
      <Header />

      <div className="padding">
      <CardGrid
          title={title}
          value={filter}
          onChange={handleFilterChange}
          error={error}
          filteredArticles={filteredArticles}
        />
      </div>
    </>
  );
};

export default ArticleCategory;
