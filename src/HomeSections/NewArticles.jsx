import axios from "axios";
import { useEffect, useState } from "react";
import RangeGrid from "../components/RangeGrid";

const NewArticles = () => {
  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env (import.meta.env.name => To call .env variable in Vite, with a name that must start with "VITE")
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchHomeArticles = async () => {
      try {
        //prettier-ignore
        const response = await axios.get(`${API_BASE_URL}/homeArticles?limit=20`,);
        console.log("Last 20 articles fetched", response.data);
        setArticleObject(response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : `Error: ${error.message}`, // Client-side error
        );
        setError("An error occurred while fetching data"); // Set the error message in case of failure
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
      }
    };

    fetchHomeArticles();
  }, [API_BASE_URL]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section>
      <RangeGrid
        homePage={true}
        allValues={articleObject}
        title="Les 20 Nouvelles oeuvres d'art"
        error={error}
        onClick={scrollToTop}
        loading={spinner}
      />
    </section>
  );
};

export default NewArticles;
