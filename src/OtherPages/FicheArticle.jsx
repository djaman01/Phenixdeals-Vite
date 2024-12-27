import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

import { PulseLoader } from "react-spinners";

const FicheArticle = () => {
  //Dans Card.jsx on a définit une dynamix route = URL avec un parmètre qui change en fonction du produit et qui est _id du produit, donc unique
  //Avec useParams, on va extraire ce paramètre qui est unique, pour définir une route dynamic dans le back-end
  const { articleId } = useParams();

  //State qui va store l'article désigné dans la fiche
  const [article, setArticle] = useState(null);
  const [errorText, setErrorText] = useState("");

  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  useEffect(() => {
    const fetchFicheArticle = async () => {
      try {
        const response = await axios.get(
          `https://phenixdeals-back.onrender.com/article/${articleId}`,
        );
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

    fetchFicheArticle();
  }, [articleId]);

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
    const message = `De phenix-deals.com,\n\nJe suis intéressé par le ${article.type} de ${article.auteur}, référence N°${article.code}`;
    const phone = "+212619635336";

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; //The encodeURIComponent function ensures the message is URL-friendly, handling spaces, line breaks (\n), and special characters.
  };

  const urlLink = () => {
    const currentUrl = window.location.href; // Get the current page URL
    const phone = "+212619635336";
    return `https://wa.me/${phone}?text=${encodeURIComponent(currentUrl)}`;
  };
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
        {/* Comme on met un titre dynamique par rapport aux données fetched et que ce n'est pas instantanée; il faut mettre une condition que la variable qui contient les properties utilisés soient rempleis, et donc ne soit pas vide */}
        <title>
          {article
            ? `Tableau de ${article.auteur} | Phenix-deals`
            : "Phenix-deals | Vente tableaux d'artistes peintres au Maroc"}
        </title>

        <meta
          name="description"
          content={
            article
              ? `Découvrez un tableau de ${article.auteur}, disponible à la vente sur Phenix-deals.com: Cliquez sur "Réserver" pour nous contacter.`
              : "Site web Marocain dédié à la vente de tableaux d'artistes peintres aux thèmes et styles variés. Contactez-nous pour plus d'informations"
          }
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content={
            article
              ? `https://www.phenix-deals.com/ficheArticle/${articleId}`
              : "https://www.phenix-deals.com"
          }
        />

        <meta
          property="og:title"
          content={
            article
              ? `Tableau de ${article.auteur} | Phenix-deals`
              : "Phenix-deals | Vente tableaux d'artistes peintres au Maroc"
          }
        />
        <meta
          property="og:description"
          content={
            article
              ? `Découvrez un tableau de ${article.auteur}, disponible à la vente sur Phenix-deals.com: Cliquez sur "Réserver" pour nous contacter.`
              : "Site web Marocain dédié à la vente de tableaux d'artistes peintres aux thèmes et styles variés. Contactez-nous pour plus d'informations"
          }
        />

        <meta
          property="og:image"
          content={
            article
              ? article.imageUrl
              : "https://www.phenix-deals.com/assets/phenix-nobg-gGMQJlPS.png"
          }
        />

        <link
          rel="canonical"
          href={
            article
              ? `https://www.phenix-deals.com/ficheArticle/${articleId}`
              : `https://www.phenix-deals.com/`
          }
        />
      </Helmet>

      <div className="mb-5 mt-3">
        <Header />
      </div>

      {errorText ? (
        <p>Error: {errorText}</p>
      ) : spinner ? ( //Affichage du spinner si 'spinner' state = true
        <div className="my-20 flex items-center justify-center">
          <PulseLoader color="#FA7A35" size={40} />
        </div>
      ) : (
        article && (
          <div className="flex h-screen items-center justify-center gap-16 overflow-hidden bg-[#e8e8e8] max-lg:h-[1050px] max-lg:w-full max-lg:flex-col max-lg:gap-11">
            <div
              data-aos="fade-right"
              className="h-[550px] w-[540px] max-lg:h-[360px] max-lg:w-[360px]"
            >
              <img
                src={article.imageUrl} //pas besoin de src={`https://phenixdeals-back.onrender.com/${article.imageUrl}`}, car l'image est dans cloudinary et non plus sur mon pc, donc on prend l'url de cloudinary comme écrit sur la database
                alt={article.infoArticle}
                className="h-full w-full rounded-lg border border-gray-300 bg-white object-contain shadow-md max-lg:object-contain"
              />
            </div>

            <div
              data-aos="fade-left"
              className="prose flex h-[550px] w-[540px]  flex-col items-center rounded-lg border border-gray-300 bg-white p-6 shadow-md max-lg:h-[500px] max-lg:w-[360px]"
            >
              <h1 className="mt-10 text-center text-[#0072B5] ">
                {article.auteur}
              </h1>
              <hr className="my-0 w-11/12 border-gray-500" />
              <h2 className="my-3  text-center">{article.infoArticle}</h2>
              <hr className="my-0 w-11/12 border-gray-500" />
              <h2 className="my-3 text-center text-[#00A170]">
                {article.prix}
              </h2>
              <hr className="my-0 w-11/12 border-gray-500" />
              <h3 className="martian-mono-regular my-3 text-center text-[#ff0921] ">
                Référence: {article.code}
              </h3>
              <div className="mt-3 flex h-32 w-full flex-col items-center justify-around max-lg:mt-1 ">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  className="no-underline"
                >
                  <button className="flex h-10 w-32 cursor-pointer items-center justify-around rounded bg-[#25D366] px-3 text-lg font-bold text-white">
                    <FaWhatsapp size={20} /> Réserver
                  </button>
                </a>
                <Link
                  to={`/pageArtist/${article.auteur}`}
                  className="no-underline"
                >
                  <button
                    onClick={scrollToTop}
                    className="flex h-10 w-auto cursor-pointer items-center justify-around rounded bg-[#0072B5] px-3 text-lg font-bold leading-5 text-white"
                  >
                    Autres {article.auteur}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )
      )}

      <Footer />
    </>
  );
};

export default FicheArticle;
