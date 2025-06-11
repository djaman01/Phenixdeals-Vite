import { Helmet } from "react-helmet-async";
import ArticleCategory from "./ArticleCategory";

const Oeuvres = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Toutes les oeuvres d'art | Phenix Deals",
    url: "https://www.phenixdeals.com/oeuvres",
    description:
      "Découvrez tous les tableaux disponibles sur Phenixdeals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget.",
    publisher: {
      "@type": "Organization",
      name: "Phenix Deals", //ici on met le nom de qui gère le site (moi c'est la marque Phenix Deals)
      url: "https://www.phenixdeals.com/oeuvres",
      logo: {
        "@type": "ImageObject",
        url: "https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png",
        width: 512,
        height: 512,
      },
    },
  };

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
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
        <meta
          property="og:url"
          content="https://www.phenixdeals.com/oeuvres"
        />
        <meta property="og:title" content="Toutes les oeuvres d'art | Phenix Deals" />
        <meta
          property="og:description"
          content="Découvrez toutes les oeuvres d'art disponibles sur Phenixdeals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget."
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        <link rel="canonical" href="https://www.phenixdeals.com/oeuvres" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <ArticleCategory
        type="oeuvre" //Simplement pour nommer le endpoint /oeuvre dans Article category
        title="Toutes les oeuvres d'art"
        searchKey="auteur"
      />
    </>
  );
};

export default Oeuvres;
