import { Helmet } from "react-helmet-async";

import { useState } from "react";

import axios from "axios";
import FilterGrid from "../components/FilterGrid";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Oeuvres = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  //state to fetch with Price filters
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  //Fetch only when user click "Filter" Button
  const handleFilter = async () => {
    try {
      setSpinner(true);

      // 🧹 Sanitize user inputs (remove spaces, "DHS", etc.)
      const cleanPrixMin = prixMin
        ? parseFloat(prixMin.replace(/[^\d.]/g, "")) // keep only numbers + dot
        : undefined;

      const cleanPrixMax = prixMax
        ? parseFloat(prixMax.replace(/[^\d.]/g, ""))
        : undefined;

      const response = await axios.get(`${API_BASE_URL}/oeuvres`, {
        params: {
          prixMin: cleanPrixMin || undefined,
          prixMax: cleanPrixMax || undefined,
        },
      });
      setArticles(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      // If backend sends a response with error message (ex: 400, 500, etc.)
      if (error.response) {
        setError(
          `${error.response.status}: ${error.response.data.message || "Server error"}`,
        );
      } else {
        // If the error is frontend-related (network, axios, etc.)
        setError(`Error: ${error.message}`);
      }
    } finally {
      setSpinner(false);
    }
  };

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
      <FilterGrid
        title="Toutes les oeuvres d'art"
        allValues={articles}
        error={error}
        loading={spinner}
        onFilter={handleFilter}
        prixMin={prixMin} //On prend la valeur de FilterGrid.jsx puis on enlève le texte et les espaces quand on clique sur Filtrer grace au code ici
        setPrixMin={setPrixMin}
        prixMax={prixMax}
        setPrixMax={setPrixMax}
      />

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default Oeuvres;
