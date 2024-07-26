import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import RangeGrid from "../components/RangeGrid";

const PageArtist = () => {
  const { auteur } = useParams();

  const [oeuvre, setOeuvre] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/pageArtist/${auteur}`)
      .then((response) => {
        setOeuvre(response.data);
        setFilteredArticles(response.data); // Initialize with all artworks
        console.log("Oeuvre Fetched", response.data);
      })
      .catch((error) => {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setErrorText("An error occurred while fetching data");
      });
  }, [auteur]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const handlePrixMin = (e) => setPrixMin(e.target.value);
  const handlePrixMax = (e) => setPrixMax(e.target.value);

  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleFilter = () => {
    
    const minPrice = prixMin
      ? parseFloat(prixMin.replace(/\s+/g, ""))
      : -Infinity;

    const maxPrice = prixMax
      ? parseFloat(prixMax.replace(/\s+/g, ""))
      : Infinity;
  
    const filtered = oeuvre.filter((e) => {
      const price = parseFloat(e.prix.replace(/\s+/g, ""));
      return price >= minPrice && price <= maxPrice;
    });
  
    // Sort filtered articles by price in ascending order
    const sortedFiltered = filtered.sort((a, b) => {
      const priceA = parseFloat(a.prix.replace(/\s+/g, ""));
      const priceB = parseFloat(b.prix.replace(/\s+/g, ""));
      return priceA - priceB;
    });
  
    setFilteredArticles(sortedFiltered);
  };
  
 
  const handleReset = () => {
    setPrixMin("");
    setPrixMax("");
    setFilteredArticles(oeuvre);
  };

  return (
    <>
      <Header />

      <RangeGrid
        title="Toutes les oeuvres de l'Artiste"
        placeholder="Prix du Tableau"
        error={errorText}
        minValue={prixMin}
        maxValue={prixMax}
        ChangePrixMin={handlePrixMin}
        ChangePrixMax={handlePrixMax}
        filteredArticles={filteredArticles}
        onFilter={handleFilter}
        onClick={scrollToTop}
        reset={handleReset}
      />
      <Footer />
    </>
  );
};

export default PageArtist;
