import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";

const NewArticles = () => {
  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState("");

  const [auteurName, setAuteurName] = useState(""); //Pour searchBar: State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleAuteurName = (e) => setAuteurName(e.target.value); //Event handler qui fait que la state articleType a pour valeur la value de l'input

  useEffect(() => {
    const fetchHomeArticles = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/homeArticles?limit=20",
        ); // Add the query parameter for limiting the results
        console.log("Last 20 articles fetched", response.data);
        setArticleObject(response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` // Server-side error
            : `Error: ${error.message}`, // Client-side error
        );
        setError("An error occurred while fetching data"); // Set the error message in case of failure
      }
    };

    fetchHomeArticles();
  }, []);

  const filteredArticles = articleObject.filter((e) =>
    e.auteur.toLowerCase().includes(auteurName.toLowerCase()),
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section>
      <CardGrid
        title="Les 20 Nouveaux Tableaux"
        placeholder="Nom de l'artiste"
        value={auteurName}
        onChange={handleAuteurName}
        error={error}
        filteredArticles={filteredArticles}
        onClick={scrollToTop}
      />
    </section>
  );
};

export default NewArticles;
