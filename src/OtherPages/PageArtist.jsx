import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import RangeGrid from "../components/RangeGrid";

const PageArtist = () => {
  const { auteur } = useParams(); //On tire le paramètre à la fin de l'url, qui est le nom de l'artiste, définit dans le component AllArtists, dans le lien quand on clique sur le nom de l'artiste

  const [oeuvres, setOeuvres] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {

    const fetchPageArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/pageArtist/${auteur}`);
        setOeuvres(response.data);
        console.log("Oeuvre Fetched", response.data);

      }
       catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setErrorText("An error occurred while fetching data");
      }
    }

    fetchPageArtist();

  }, [auteur])

  return (
    <>
      <Header />

      <RangeGrid
        title={<>Toutes les oeuvres de <span style={{color:'#000000'}}>{auteur}</span></>}
        allValues={oeuvres}
        error={errorText}
      />
      <Footer />
    </>
  );
};

export default PageArtist;
