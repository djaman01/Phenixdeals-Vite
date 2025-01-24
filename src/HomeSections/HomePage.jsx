import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewArticles from "./NewArticles";
import ScrollPage from "./ScrollPage";

const HomePage = () => {
  // JSON-LD (Linked Data) permet à Google de mieux comprendre le type de contenu de la page, pour améliorer le référencement dans google
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Phenix-deals | Vente de tableaux d'artistes peintres au Maroc",
    url: "https://www.phenix-deals.com",
    description:
      "Phenix-deals.com est un site web Marocain qui vous propose d'acheter et de vendre des tableaux d'artistes peintres. Découvrez des oeuvres d'art uniques !",
    publisher: {
      "@type": "Organization",
      name: "Phenix-deals", //ici on met le nom de qui gère le site (moi c'est la marque phenix-deals)
      url: "https://www.phenix-deals.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png",
        width: 512,
        height: 512,
      },
    },
  };

  return (
    //overflow-hidden pour ne pas avoir de scrollbar horizontale
    <main className="overflow-hidden">
      <Helmet>
        {/* Titre de la page pour les onglets et le SEO:  entre 50 et 60 caractères  */}
        <title>
          Phenix-deals | Vente de tableaux d'artistes peintres au Maroc
        </title>

        {/*Résumé qui va apparaitre dans les moteurs de recherche: 150 à 160 caractères*/}
        <meta
          name="description"
          content="Phenix-deals.com est un site web Marocain qui vous propose d'acheter et de vendre des tableaux d'artistes peintres. Découvrez des oeuvres d'art uniques !"
        />

        {/* Open Graph pour les réseaux sociauX/ Type de contenu et URL à paratgé */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.phenix-deals.com/" />

        {/*Titre de la page lorsqu'elle est partagée sur les réseaux sociaux: mettre le même titre que l'onglet */}
        <meta
          property="og:title"
          content="Phenix-deals | Vente de tableaux d'artistes peintres au Maroc"
        />

        {/*Texte qui va s'afficher en-dessous du titre: mettre la même description que celle du moteur de recherche*/}
        <meta
          property="og:description"
          content="Phenix-deals.com est un site web Marocain qui vous propose d'acheter et de vendre des tableaux d'artistes peintres. Découvrez des oeuvres d'art uniques !"
        />

        {/* Image lors du partage sur les réseaux sociaux: mettre l'url absolue de l'image sur le site */}
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        {/*Comme le site est accessible via www.phenix-deals.com ou juste phenix-deals.com; on choisi uen version principale à indexer pour pas qu'il y ait de duplication: ça optimise le SEO */}
        <link rel="canonical" href="https://www.phenix-deals.com/" />

        {/* JSON-LD structured data: permet aux moteurs de recherche de comprendre le contenu de la page et d'améliorer le référencement. */}
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <header className="mb-5 mt-2">
        <Header />
      </header>

      <section className="mb-10 border-b border-t border-indigo-300 py-5 text-center max-lg:mb-5 ">
        <h1 className="playwrite text-3xl text-gray-800 max-lg:text-2xl">
          Achat et Vente d'oeuvres d'Art
        </h1>
      </section>

      <section className="rounded-2xl bg-[#EDF1FF]">
        <ScrollPage />
      </section>

      <section>
        <NewArticles />
      </section>

      <footer className="pt-8">
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
