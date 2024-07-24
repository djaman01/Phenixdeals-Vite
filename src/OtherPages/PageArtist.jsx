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

const [prix, setPrix] =useState("");

const handlePrix = (e) => setPrix(e.target.value);

//On va mapper sur une nouvelle array qui ne contient que des prix qu'on a écrit dans l'input (si on n'écrit rien on voit tous les prix)
const filteredPrix = oeuvre.filter((e)=>e.prix.toLowerCase().replace(/\s+/g, '').includes(prix.toLowerCase().replace(/\s+/g, ''))) //replace permet d'enlever les espaces entre les prix, pour que si le client écrit un nombre sans espace, il verra quand même les prix écrits avec un espace

  return (
    <>
      <Header />

      <CardGrid
        title="Toutes les oeuvres de l'Artiste "
        placeholder="Prix du Tableau"
        error={errorText}
        value={prix}
        onChange={handlePrix}
        filteredArticles={filteredPrix}
        onClick = {scrollToTop}
      />
      <Footer />
    </>
  );
};

export default PageArtist;
