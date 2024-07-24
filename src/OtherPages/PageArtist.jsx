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

//On va mapper sur une nouvelle array qui ne contient que les éléments qui passent cette comparaison: que le prix en minuscule et sans espace de l'élément = le prix en minuscule et sans espace écrit par l'utilisateur dans l'input (s'il n'écrit rien dans l'input on voit tout les éléments)
const filteredPrix = oeuvre.filter((e)=>e.prix.toLowerCase().replace(/\s+/g, '').includes(prix.toLowerCase().replace(/\s+/g, ''))) //replace permet, lors de la comparaisons, d'enlever les espaces entre les prix des éléments et celui écrit par l'utilisateur dans l'input, pour que quelque soit la manière dont le client écrit le prix dans l'input (avec ou sans espace), il verra quand même les prix correspondant dans les éléments

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
