import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";

const BestDeals = () => {
  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

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
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
      }
    };

    fetchHomeArticles();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title> Best Deals | Phenix Deals</title>
        <meta
          name="description"
          content="Découvrez les meilleures affaires sur Phenixdeals.com: une collection d'oeuvres d'art uniques et aux meilleurs prix !"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://phenixdeals.com/bestDeals" />

        <meta property="og:title" content="Best Deals | Phenix Deals" />

        <meta
          property="og:description"
          content="Découvrez les meilleures affaires sur Phenixdeals.com: une collection d'oeuvres d'art uniques et aux meilleurs prix !"
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://phenixdeals.com/bestDeals" />
      </Helmet>

      <div className="mt-2">
        <Header />
      </div>

      <main>
        <RangeGrid
          bestDeals={true}
          allValues={articleObject}
          title="Les Meilleures Affaires"
          placeholder="Nom de l'artiste"
          error={error}
          onClick={scrollToTop}
          loading={spinner}
        />
      </main>
      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default BestDeals;
