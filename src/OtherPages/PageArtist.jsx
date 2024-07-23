import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import CardGrid from "../components/CardGrid";

const PageArtist = () => {
  const { auteur } = useParams();

  const [oeuvre, setOeuvre] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3005/pageArtist/${auteur}`)
      .then((response) => {
        setOeuvre(response.data);
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

  return (
    <>
      <Header />

      <CardGrid
        title="Toutes les oeuvres de l'Artiste "
        placeholder="Laissez vide"
        error={errorText}
        filteredArticles={oeuvre}
        onClick = {scrollToTop}
      />
      <Footer />
    </>
  );
};

export default PageArtist;
