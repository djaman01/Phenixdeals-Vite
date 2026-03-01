import axios from "axios";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ImShare2 } from "react-icons/im";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

import { PulseLoader } from "react-spinners";

const FicheOeuvre = () => {
  //Dans Card.jsx on a définit une dynamix route = URL avec un parmètre qui change en fonction du produit et qui est code du produit, donc unique
  //Avec useParams, on va extraire ce paramètre qui est unique, pour définir une route dynamic dans le back-end
  const { auteur, code } = useParams();

  const encodeAuteur = encodeURIComponent(auteur); //Pour lire les espaces dans l'url

  //State qui va store l'article désigné dans la fiche
  const [article, setArticle] = useState(null);
  const [errorText, setErrorText] = useState("");

  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFicheTableau = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/article/${code}`);
        setArticle(response.data);
        console.log("Article Fetched", response.data);
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

    fetchFicheTableau();
  }, [API_BASE_URL, code]);

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 100,
      duration: 750,
      easing: "ease-in-out",
      // delay: 100,
    });
  }, []);

  //\n= retour à la ligne \n\n = retour à la ligne + espace entre les 2 paragraphes
  const whatsappLink = () => {
    const message = `De phenixdeals.com,\n\nJe suis intéressé par l'oeuvre de ${article.auteur}, référence N°${article.code}`;
    const phone = "+212619635336";

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; //The encodeURIComponent function ensures the message is URL-friendly, handling spaces, line breaks (\n), and special characters.
  };

  const urlLink = () => {
    const currentUrl = window.location.href; // Get the current URL

    return `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  //Code pour appliquer data-os de la fiche qui continet les infos du tableau, que pour les écran md ou +; comme ça sur les mobiles, la fiche d'info du tableau sera tjs présente et les visiteurs scrolleront vers le bas pour la lire
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth >= 768,
  ); //compare la largeur actuelle de l'écran (window.innerwidth) à 768px: donc ça retourne true ou false en fonction du résultat et j'ai mis 768px car md=768px

  //On va coder un useEffect pour écouter les chgts de taille de l'écran en temps réel
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); // Retourne true or false en comparant la taille de l'écran à 768px
    };

    window.addEventListener("resize", handleResize); //"resize" est un évenement qui écoute les chgts de taille de l'écran en temps réel: quand un utilisateur redimensionnel a taille de l'écran, l'évenement va se déclencher et appler handleResize et met donc à jour dynamiquement isMediumScreen en true or false par rapport à 768px, pour refléter la largeur de la fenêtre en temps réel

    return () => window.removeEventListener("resize", handleResize); //Pour nettoyer les gestionnaires d'évenements et éviter les memory leaks: here we use it to ensure that the 'resize' event listener is properly removed when the component is unmounted
  }, []);

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Comme on met un titre dynamique par rapport aux données fetched et que ce n'est pas instantanée; il faut mettre une condition que la variable qui contient les properties utilisés soient rempleis, et donc ne soit pas vide */}
        <title>
          {article
            ? `Oeuvre de ${article.auteur} | Phenix Deals`
            : "Phenix Deals | Vente d'oeuvres d'art au Maroc"}
        </title>

        <meta
          name="description"
          content={
            article
              ? `Découvrez une oeuvre de ${article.auteur}, disponible à la vente sur Phenixdeals.com: Cliquez sur "Contact" si intéressé.`
              : 'Découvrez une oeuvre disponible à la vente sur Phenixdeals.com: Cliquez sur "Contact" si intéressé.'
          }
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content={
            article
              ? `https://www.phenixdeals.com/${encodeAuteur}/${code}`
              : "https://www.phenixdeals.com"
          }
        />

        <meta
          property="og:title"
          content={
            article
              ? `Oeuvre de ${article.auteur} | Phenix Deals`
              : "Phenix Deals | Vente d'oeuvres d'art au Maroc"
          }
        />
        <meta
          property="og:description"
          content={
            article
              ? `Oeuvre de ${article.auteur}, disponible à la vente sur Phenixdeals.com.`
              : `Découvrez cette oeuvre disponible à la vente sur Phenixdeals.com`
          }
        />

        <meta
          property="og:image"
          content={
            article
              ? article.imageOriginal
              : "https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
          }
        />

        <link
          rel="canonical"
          href={
            article
              ? `https://www.phenixdeals.com/${encodeAuteur}/${code}`
              : `https://www.phenixdeals.com/`
          }
        />
      </Helmet>

      <div className="mb-5 mt-3">
        <Header />
      </div>

      <div
        className={`flex items-center justify-center bg-[#f5f5f5]
    ${spinner ? "min-h-screen" : ""}
  `}
      >
        {" "}
        {errorText ? (
          <p>Error: {errorText}</p>
        ) : spinner ? ( //Affichage du spinner si 'spinner' state = true
          <div className="flex items-start justify-center">
            <PulseLoader color="#FA7A35" size={40} />
          </div>
        ) : (
          article && (
            <div className="flex items-center justify-center gap-16 overflow-hidden bg-[#f5f5f5]  max-lg:w-full max-lg:flex-col max-lg:gap-5 max-lg:pb-16">
              <div
                data-aos="fade-right"
                className="h-[670px] w-[700px] py-5 max-lg:mt-5 max-lg:h-[360px] max-lg:w-[360px]"
              >
                <img
                  src={article.imageOriginal} //pas besoin de src={`https://phenixdeals-back.onrender.com/${article.imageOriginal}`}, car l'image est dans cloudinary et non plus sur mon pc, donc on prend l'url de cloudinary comme écrit sur la database
                  alt={article.infoArticle}
                  className="h-full w-full object-contain max-lg:object-contain"
                />
              </div>

              <div
                data-aos={isMediumScreen ? "fade-left" : undefined} //Si l'écran est <md (donc pour les mobiles); l'animation ne va pas s'activer (le but est que les gens voit qu'il y a une fiche d'infos en bas sur le tel, et scroll pour voir les infos). On met udnefined au lieu de null, pour que data-os n'éxiste pas si <md alors que null il va existé avec une valeur null, ce qui pourrait créer des problèmes
                className="prose flex h-[550px] w-[540px]  flex-col items-center rounded-lg border border-gray-300 bg-white p-6 shadow-md max-lg:h-[500px] max-lg:w-[360px]"
              >
                <h1 className="mt-2 flex h-12 items-center justify-center text-center text-[#0072B5]">
                  {article.auteur}
                </h1>
                <hr className="my-0 w-11/12 border-gray-500" />
                <h2 className="my-3  flex h-16 items-center justify-center text-center">
                  {article.allDescription}
                </h2>
                <hr className="my-0 w-11/12 border-gray-500" />
                <h2 className="my-3 flex h-7 items-center justify-center text-center text-[#00A170]">
                  {/* When i select priceStatus = "sold" or "onRequest", it clears the value of prix, so we have to add this conditions in the front-end to show the value depending on the status */}
                  {article.priceStatus === "sold"
                    ? "Vendu"
                    : article.priceStatus === "onRequest"
                      ? "Prix sur demande"
                      : typeof article.prix === "number"
                        ? `${article.prix} Dhs`
                        : ""}
                </h2>
                <hr className="my-0 w-11/12 border-gray-500" />
                <h3 className="martian-mono-regular mt-2 flex h-8 items-center  justify-center text-center text-[#ff0921] ">
                  Référence: {article.code}
                </h3>
                <div className="mt-3 flex h-44 w-full flex-col items-center justify-around space-y-5 max-lg:mt-1 max-lg:space-y-3 ">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    className="no-underline"
                  >
                    <button className="flex h-10 w-32 cursor-pointer items-center justify-around rounded bg-[#25D366] px-3 text-lg font-bold text-white active:scale-105">
                      <FaWhatsapp size={20} />
                      Contact
                    </button>
                  </a>
                  <Link
                    to={`/pageArtist/${article.auteur}`}
                    className="no-underline"
                  >
                    <button
                      onClick={scrollToTop}
                      className="flex h-10 w-auto cursor-pointer items-center justify-around rounded bg-[#0072B5] px-3 text-lg font-bold leading-5 text-white active:scale-105"
                    >
                      Autres oeuvres de {article.auteur}
                    </button>
                  </Link>

                  <a href={urlLink()} target="_blank" className="no-underline">
                    <button className="flex h-10 w-32 cursor-pointer items-center justify-around rounded-full bg-[#128C7E] px-3 text-lg font-bold text-white active:scale-105">
                      <ImShare2 size={20} /> Partager
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default FicheOeuvre;
