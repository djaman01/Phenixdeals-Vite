import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";

const PageArtist = () => {
  const { auteur } = useParams(); //On tire le paramètre à la fin de l'url, qui est le nom de l'artiste, définit dans le component AllArtists, dans le lien quand on clique sur le nom de l'artiste

  const [oeuvres, setOeuvres] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

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
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
      }
    };

    fetchPageArtist();
  }, [auteur]);

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*On prend le nom de l'auteur tiré de l'url et stocké dans la variable auteur grâce à useParams; donc pas besoin de condition, car le paramètre est instantanément dispo  */}
        <title>{`Oeuvres de ${auteur} | Phenix Deals`}</title>

        <meta
          name="description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenixdeals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.phenixdeals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
        <meta
          property="og:title"
          content={`Tableaux de ${auteur} | Phenix Deals`}
        />
        <meta
          property="og:description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenixdeals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        {/* Pour éviter tout problème de contenu dupliqué. Cela renforce encore le SEO de chaque page artiste. */}
        <link
          rel="canonical"
          href={`https://www.phenixdeals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
      </Helmet>

      <Header />

      <RangeGrid
        auteur={auteur}
        title={
          <>
            Toutes les oeuvres de{" "}
            <span style={{ color: "#000000" }}>{auteur}</span>
          </>
        }
        allValues={oeuvres}
        error={errorText}
        loading={spinner}
      />

      <Footer />
    </>
  );
};

export default PageArtist;
