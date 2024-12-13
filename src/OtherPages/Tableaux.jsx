import { Helmet } from "react-helmet-async";
import ArticleCategory from "./ArticleCategory";


const Tableaux = () => {
  return (
    <>
      <Helmet>
        <title>Tous les Tableaux | Phenix-deals</title>
        <meta
          name="description"
          content="Découvrez tous les tableaux disponibles sur Phenix-deals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.phenix-deals.com/tableaux"
        />
        <meta property="og:title" content="Tous les Tableaux | Phenix-deals" />
        <meta
          property="og:description"
          content="Découvrez tous les tableaux disponibles sur Phenix-deals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget."
        />
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        <link rel="canonical" href="https://www.phenix-deals.com/tableaux" />
      </Helmet>

      <ArticleCategory
        type="tableaux"
        title="Tous les Tableaux"
        searchKey="auteur"
      />
    </>
  );
};

export default Tableaux;
