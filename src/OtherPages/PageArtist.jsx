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

  //!!! Utiliser encodeURIComponent pour encoder le paramètre 'auteur' car il peut contenir des caractères spéciaux (espaces, &, etc.).
  /// Cela assure une robustesse supplémentaire, même si les navigateurs modernes encodent déjà certains caractères comme l'espace en %20 par défaut
  useEffect(() => {
    const fetchPageArtist = async () => {
      try {
        const response = await axios.get(
          `https://phenixdeals-back.onrender.com/pageArtist/${encodeURIComponent(auteur)}`,
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
        {/*On prend le nom de l'auteur tiré de l'url et stocké dans la variable auteur grâce à useParams; donc pas besoin de condition, car le paramètre est instantanément dispo  */}
        <title>{`Tableaux de ${auteur} | Phenix-deals`}</title>

        <meta
          name="description"
          content={`Découvrez tous les tableaux de ${auteur} disponibles à la vente sur Phenix-deals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.phenix-deals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
        <meta
          property="og:title"
          content={`Tableaux de ${auteur} | Phenix-deals`}
        />
        <meta
          property="og:description"
          content={`Découvrez tous les tableaux de ${auteur} disponibles à la vente sur Phenix-deals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        {/* Pour éviter tout problème de contenu dupliqué. Cela renforce encore le SEO de chaque page artiste. */}
        <link
          rel="canonical"
          href={`https://www.phenix-deals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
      </Helmet>

      <Header />

      <RangeGrid
        title={
          <>
            Tous les tableaux de{" "}
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
