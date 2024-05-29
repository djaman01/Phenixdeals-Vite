import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";
import Footer from "../components/Footer";



const AllArticles = () => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/allArticles`)
      .then((response) => {
        setArticle(response.data);
        console.log("All articles fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response //si error.response = error from the server
            ? `${error.response.status}: ${error.response.data.message}` //server side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data"); //
      });
  }, []);

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
        title="Tous les Articles "
        value={articleAuteur}
        onChange={handleArticleAuteur}
        error={error}
        filteredArticles={filteredArticles}
      />
    </div>

    <Footer />
  </>
  )
}

export default AllArticles