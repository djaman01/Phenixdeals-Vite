import { Helmet } from "react-helmet-async";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewArticles from "./NewArticles";
import ScrollPage from "./ScrollPage";

const HomePage = () => {
  return (
    //overflow-hidden pour ne pas avoir de scrollbar horizontale
    <main className="overflow-hidden">
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Titre de la page pour les onglets et le SEO:  entre 50 et 60 caractères  */}
        <title>
          Phenix Deals | Vente de tableaux & d'oeuvres d'art au Maroc
        </title>

        {/*Résumé qui va apparaitre dans les moteurs de recherche: 150 à 160 caractères*/}
        <meta
          name="description"
          content="Phenix Deals est un espace dédié à l'achat et à la vente d'oeuvres d'art au Maroc : tableaux, sculptures et photographies."
        />
        {/* Open Graph pour les réseaux sociauX/ Type de contenu et URL à paratgé */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.phenixdeals.com/" />

        {/*Titre de la page lorsqu'elle est partagée sur les réseaux sociaux: mettre le même titre que l'onglet */}
        <meta
          property="og:title"
          content="Phenix Deals | Vente de tableaux & d'oeuvres d'art au Maroc"
        />

        {/*Texte qui va s'afficher en-dessous du titre: mettre la même description que celle du moteur de recherche*/}
        <meta
          property="og:description"
          content="Phenix Deals est un espace dédié à l'achat et à la vente d'oeuvres d'art au Maroc : tableaux, sculptures et photographies."
        />

        {/* Image lors du partage sur les réseaux sociaux: mettre l'url absolue de l'image sur le site */}
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/logo-phenix-deals-media.jpeg"
        />

        {/*Comme le site est accessible via www.phenixdeals.com ou juste phenixdeals.com; on choisi uen version principale à indexer pour pas qu'il y ait de duplication: ça optimise le SEO */}
        <link rel="canonical" href="https://www.phenixdeals.com/" />
      </Helmet>

      <header className="mb-5 mt-2">
        <Header />
      </header>

      <section className="mb-4 mt-12 text-center max-lg:mx-2 max-lg:mt-14">
        <h1 className="playwrite text-4xl text-[#dd2630] max-lg:text-[30px]">
          Vente de tableaux et d'oeuvres d'art
        </h1>
      </section>

      <section className="mb-4 mt-20 text-center max-lg:mt-14">
        <h2 className=" martian-mono mb-3 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mb-2 max-lg:text-[27px]">
          Sélection du Mois
        </h2>
        <p className="font-roboto mx-2 text-xl text-gray-800">
          <strong>Cliquez</strong> sur une oeuvre pour plus d'informations
        </p>
      </section>

      <section className="mt-10 rounded-2xl ">
        <ScrollPage />
      </section>

      <section className="mt-20">
        <NewArticles />
      </section>

      <footer className="pt-8">
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
