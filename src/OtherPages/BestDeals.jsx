import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const BestDeals = () => {
  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState("");

  const [auteurName, setAuteurName] = useState(""); //Pour searchBar: State variable qui va store la value de l'input et qui doit changer en fonction de ce qu'on écrit

  const handleArticleType = (e) => setAuteurName(e.target.value); //Event handler qui fait que la state articleType a pour valeur la value de l'input

  useEffect(() => {
    const fetchHomeArticles = async () => {
      try {
        const response = await axios.get(
          "https://phenixdeals-back.onrender.com/bestDeals",
        ); // Add the query parameter for limiting the results
        console.log("Best Deals fetched", response.data);
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
    a;
  };

  return (
    <>
      <Helmet>
        <title> Best Deals | Phenix-deals</title>
        <meta
          name="description"
          content="Découvrez les meilleures affaires sur Phenix-deals.com. Une collection de tableaux uniques d'artistes peintres au meilleur prix."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://phenix-deals.com/best-deals" />

        <meta property="og:title" content="Best Deals | Phenix-deals" />

        <meta
          property="og:description"
          content="Découvrez les meilleures affaires sur Phenix-deals.com. Une collection de tableaux uniques d'artistes peintres au meilleur prix."
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://phenix-deals.com/best-deals" />
      </Helmet>

      <Header />

      <main>
        <CardGrid
          title="Les Meilleures Affaires"
          placeholder="Nom de l'artiste"
          value={auteurName}
          onChange={handleArticleType}
          error={error}
          filteredArticles={filteredArticles}
          onClick={scrollToTop}
        />
      </main>

      <Footer />
    </>
  );
};

export default BestDeals;
