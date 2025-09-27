import { Helmet } from "react-helmet-async";
import ArticleCategory from "./ArticleCategory";

const Oeuvres = () => {
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

      <ArticleCategory
        type="oeuvres"
        title="Toutes les oeuvres"
        searchKey="auteur"
      />
    </>
  );
};

export default Oeuvres;
