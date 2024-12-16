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
        {/* Titre de la page pour les onglets et le SEO:  entre 50 et 60 caractères  */}
        <title>Phenix-deals | Vente tableaux d'artistes peintres au Maroc</title>

        {/*Résumé qui va apparaitre dans les moteurs de recherche: 150 à 160 caractères*/}
        <meta
          name="description"
          content="Site web Marocain dédié à la vente de tableaux d'artistes peintres aux thèmes et styles variés. Contactez-nous pour plus d'informations"
        />

        {/* Open Graph pour les réseaux sociauX/ Type de contenu et URL à paratgé */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.phenix-deals.com/" />

        {/*Titre de la page lorsqu'elle est partagée sur les réseaux sociaux: mettre le même titre que l'onglet */}
        <meta
          property="og:title"
          content="Phenix-deals | Vente tableaux d'artistes peintres au Maroc"
        />

        {/*Texte qui va s'afficher en-dessous du titre: mettre la même description que celle du moteur de recherche*/}
        <meta
          property="og:description"
          content="Site web Marocain dédié à la vente de tableaux d'artistes peintres aux thèmes et styles variés. Contactez-nous pour plus d'informations"
        />

        {/* Image lors du partage sur les réseaux sociaux: mettre l'url absolue de l'image sur le site */}
        <meta
          property="og:image"
          content="https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
      </Helmet>

      <header className="mb-5 mt-3">
        <Header />
      </header>

      <section className="rounded-2xl bg-[#EDF1FF]">
        <ScrollPage />
      </section>

      <section className="mt-5">
        <NewArticles />
      </section>

      <footer className="pt-8">
        <Footer />
      </footer>
    </main>
  );
};

export default HomePage;
