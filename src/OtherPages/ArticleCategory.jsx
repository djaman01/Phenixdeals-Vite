import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";
import Footer from "../components/Footer";

const ArticleCategory = ({ type, title, showSearchInput, typeObjet }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fecthByCategory = async () => {
      try {
        const response = await axios.get(
          `https://www.phenix-deals.com/${type}`,
        );
        setArticles(response.data);
        console.log(`${title} articles fetched`, response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data");
      }
    };

    fecthByCategory();
  }, [type, title]);

  return (
    <>
      <div className="mt-3">
        <Header />
      </div>

      <RangeGrid
        title={title}
        allValues={articles}
        error={error}
        showSearchInput={showSearchInput}
        typeObjet={typeObjet}
      />

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default ArticleCategory;
