import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import CardGrid from "../components/CardGrid";

const Tableaux = () => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState("");

  const { type } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/articles/${type}`)
      .then((response) => setArticle(response.data))
      .catch((error) => {
        console.error("Front-end error:", error.message);
        setError("An error occurred while fetching data");
      })
      .catch((error) => {
        console.error(
          error.response &&
            `${error.response.status}: ${error.response.data.message}`,
        );
      });
  }, [type]);

  const [articleAuteur, setArticleAuteur] = useState("");

  const handleArticleAuteur = (e) => setArticleAuteur(e.target.value);

  const filteredArticles = article.filter((e) =>
    e.auteur.toLowerCase().includes(articleAuteur.toLowerCase()),
  );

  return (
    <>
      <Header />

      <div className="padding">
        <CardGrid
          title="Tous les Tableaux"
          value={articleAuteur}
          onChange={handleArticleAuteur}
          error={error}
          filteredArticles={filteredArticles}
        />
      </div>
    </>
  );
};

export default Tableaux;
