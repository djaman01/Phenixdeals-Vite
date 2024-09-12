import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";
import Footer from "../components/Footer";

const ArticleCategory = ({ type, title, searchKey}) => {

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(()=> {
    const fecthByCategory = async () => {

      try {
        const response = await axios.get(`http://localhost:3005/${type}`);
        setArticles(response.data);
        console.log(`${title} articles fetched`, response.data);
      } 

      catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data");
      }
    }

    fecthByCategory();

  }, [type, title])

  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredArticles = articles.filter((e) =>
    e[searchKey].toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
     <div className="mt-3">
      <Header />
    </div>
    
        <RangeGrid
          title={title}
          allValues={filteredArticles}
          error={error}
        />
      <div className="pt-8">
        <Footer />
      </div>
      
    </>
  );
};

export default ArticleCategory;
