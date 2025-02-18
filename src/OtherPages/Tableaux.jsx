import { Helmet } from "react-helmet-async";
import ArticleCategory from "./ArticleCategory";

const Tableaux = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tous les Tableaux | Phenix-deals.com",
    url: "https://www.phenix-deals.com/tableaux",
    description:
      "Découvrez tous les tableaux disponibles sur Phenix-deals.com et utilisez nos filtres pour trouver une oeuvre en fonction de votre budget.",
    publisher: {
      "@type": "Organization",
      name: "Phenix-deals", //ici on met le nom de qui gère le site (moi c'est la marque phenix-deals)
      url: "https://www.phenix-deals.com/tableaux",
      logo: {
        "@type": "ImageObject",
        url: "https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png",
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

        {/* JSON-LD structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
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
