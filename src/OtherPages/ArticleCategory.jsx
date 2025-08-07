import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";

const ArticleCategory = ({ type, title, showSearchInput, typeObjet }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fecthByCategory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${type}`);
        setArticles(response.data);
        console.log(`${title} articles fetched`, response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data");
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
      }
    };

    fecthByCategory();
  }, [API_BASE_URL, type, title]);

  return (
    <>
      <div className="mt-2">
        <Header />
      </div>

      <RangeGrid
        title={title}
        allValues={articles}
        error={error}
        showSearchInput={showSearchInput}
        typeObjet={typeObjet}
        loading={spinner}
      />

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default ArticleCategory;
