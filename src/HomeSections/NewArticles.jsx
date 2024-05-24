import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import axios from "axios";

const NewArticles = () => {
  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState("");

  const [articleType, setArticleType] = useState(""); //Pour searchBar: State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleArticleType = (e) => setArticleType(e.target.value); //Event handler qui fait que la state articleType a pour valeur la value de l'input

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3005/homeArticles?limit=16") // Add the query parameter for limiting the results
        .then((response) => {
          console.log("Last 20 articles fetched", response.data);
          setArticleObject(response.data);
        })
        .catch((error) => {
          setError("An error occurred while fetching data.");
        });
    };

    fetchData();
  }, []);

  const filteredArticles = articleObject.filter((e) =>
    e.type.toLowerCase().includes(articleType.toLowerCase()),
  );

  return (
    <section>
      <CardGrid
        title="Les 16 Nouveaux Articles"
        value={articleType}
        onChange={handleArticleType}
        error={error}
        filteredArticles={filteredArticles}
      />
    </section>
  );
};

export default NewArticles;
