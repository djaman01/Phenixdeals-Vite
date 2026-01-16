import axios from "axios";
import { useEffect, useState } from "react";
import RangeGrid from "../components/RangeGrid";

const NewArticles = () => {
  // Access API base URL from env (import.meta.env.name => To call .env variable in Vite, with a name that must start with "VITE")
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [articleObject, setArticleObject] = useState([]); //State variable ou on va store tous les objets représentants les articles
  const [filteredArticles, setFilteredArticles] = useState([]); //Pour store les articles après avoir appliqué le filtre => ne pas faire useState(articleObject) => to always keep 1 source of truth
  const [isFiltering, setIsFiltering] = useState(false);

  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  const [prixMin, setPrixMin] = useState("");

  const [prixMax, setPrixMax] = useState("");

  const articlesToDisplay = isFiltering ? filteredArticles : articleObject;

  const handlePrixMin = (e) => {
    setPrixMin(e.target.value);
  };

  const handlePrixMax = (e) => {
    setPrixMax(e.target.value);
  };

  //Quand on clique sur le bouton Filtrer
  const handleFilter = () => {
    //To replace the number written by the visitor, with another number with no space, so we can compare them
    const minPrice = prixMin
      ? parseFloat(prixMin.replace(/\s+/g, "")) //Transform the number written by the visitor with a string with no spaces so we can compare numbers / then convert the cleaned string back into a number using parseFloat
      : -Infinity; //If prixMin is not provided, set minPrice to -Infinity to ensure any comparison will succeed

    const maxPrice = prixMax
      ? parseFloat(prixMax.replace(/\s+/g, ""))
      : Infinity;

    const filtered = articleObject.filter((e) => {
      const price = parseFloat(e.prix.replace(/\s+/g, "")); //Prix de l'élément qu'on remplace au même format que les prix min et max précédents
      const filterByPrice = price >= minPrice && price <= maxPrice;

      return filterByPrice;
    });

    // Sort filtered articles by price in ascending order / [...filtered] => we create a copy of filtered variable to avoid mutation and preserve immutability of states, because .sort() is a mutating method that change the original state like .reverse() .splice() and not like .map(), .filter() .slice()
    const sortedFiltered = [...filtered].sort((a, b) => {
      const priceA = parseFloat(a.prix.replace(/\s+/g, ""));
      const priceB = parseFloat(b.prix.replace(/\s+/g, ""));
      return priceA - priceB;
    });

    setFilteredArticles(sortedFiltered);
    setIsFiltering(true); //To show the articles in the state filteredArticles
  };

  const handleReset = () => {
    setPrixMin("");
    setPrixMax("");
    setFilteredArticles([]);
    setIsFiltering(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

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

  return (
    <section>
      <RangeGrid
        articles={articlesToDisplay}
        title="Les 20 Nouvelles oeuvres d'art"
        subtitle="Utilisez le filtre pour découvrir les oeuvres adaptées à votre budget"
        prixMin={prixMin}
        prixMax={prixMax}
        handlePrixMin={handlePrixMin}
        handlePrixMax={handlePrixMax}
        handleFilter={handleFilter}
        showReset={isFiltering} //To show the reset Button only after applying filter
        handleReset={handleReset}
        error={error}
        onClick={scrollToTop}
        loading={spinner}
      />
    </section>
  );
};

export default NewArticles;
