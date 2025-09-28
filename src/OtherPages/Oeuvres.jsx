import { Helmet } from "react-helmet-async";

import axios from "axios";
import { useEffect, useState } from "react";
import RangeGrid from "../components/RangeGrid";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Oeuvres = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fecthByCategory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/oeuvres`);
        setArticles(response.data);
        console.log(`oeuvres fetched`, response.data);
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
  }, [API_BASE_URL]);

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Toutes les oeuvres d'art | Phenix Deals</title>
        <meta
          name="description"
          content="Découvrez toutes les oeuvres d'art disponibles sur Phenixdeals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.phenixdeals.com/oeuvres" />
        <meta
          property="og:title"
          content="Toutes les oeuvres d'art | Phenix Deals"
        />
        <meta
          property="og:description"
          content="Découvrez toutes les oeuvres d'art disponibles sur Phenixdeals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget."
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        <link rel="canonical" href="https://www.phenixdeals.com/oeuvres" />
      </Helmet>

      <div className="mt-2">
        <Header />

      </div>
      <RangeGrid
        title="Toutes les oeuvres d'art"
        allValues={articles}
        error={error}
        loading={spinner}
      />

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default Oeuvres;
