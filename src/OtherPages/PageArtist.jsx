import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import RangeGrid from "../components/RangeGrid";
import { Helmet } from "react-helmet-async";

const PageArtist = () => {
  const { auteur } = useParams(); //On tire le paramètre à la fin de l'url, qui est le nom de l'artiste, définit dans le component AllArtists, dans le lien quand on clique sur le nom de l'artiste

  const [oeuvres, setOeuvres] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const fetchPageArtist = async () => {
      try {
        const response = await axios.get(
          `https://phenixdeals-back.onrender.com/pageArtist/${auteur}`,
        );
        setOeuvres(response.data);
        console.log("Oeuvre Fetched", response.data);
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setErrorText("An error occurred while fetching data");
      }
    };

    fetchPageArtist();
  }, [auteur]);

  return (
    <>
      <Helmet>
        <title>{`Oeuvres de ${auteur} | Phenix-deals`}</title>{" "}
        {/*On prend le nom de l'auteur tiré de l'url et stocké dans la variable auteur grâce à useParams  */}
        <meta
          name="description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenix-deals.com ! `}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            oeuvres
              ? `https://www.phenix-deals.com/pageArtist/${auteur}`
              : "https://www.phenix-deals.com"
          }
        />
        <meta
          property="og:title"
          content={`Oeuvres de ${auteur} | Phenix-deals`}
        />
        <meta
          property="og:description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenix-deals.com ! `}
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
      </Helmet>

      <Header />

      <RangeGrid
        title={
          <>
            Toutes les oeuvres de{" "}
            <span style={{ color: "#000000" }}>{auteur}</span>
          </>
        }
        allValues={oeuvres}
        error={errorText}
      />

      <Footer />
    </>
  );
};

export default PageArtist;
