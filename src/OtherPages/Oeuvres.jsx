import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Slide, ToastContainer, toast } from "react-toastify";

const Oeuvres = () => {
  const notifyError = () =>
    toast.error("Veuillez entrer un prix minimum ou maximum avant de filtrer");

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  //state to fetch with Price filters
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  //Fetch by price range, only when user click "Filter" Button
  const handleFilter = async () => {
    //Pour arrêter handleFilter si les prix Min et Max ne sont pas remplis
    if (!prixMin && !prixMax) {
      notifyError();
      return; //Arrête la function handleFilter si prixMin ou PrixMax ne sont pas remplis dans les inputs
    }
    try {
      setSpinner(true);

      // 🧹 Sanitize user inputs: remove spaces, "Dhs", etc., keep only digits
      const cleanPrixMin = prixMin
        ? parseInt(prixMin.replace(/[^\d]/g, ""), 10)
        : undefined;

      const cleanPrixMax = prixMax
        ? parseInt(prixMax.replace(/[^\d]/g, ""), 10)
        : undefined;

      // Log values before sending
      console.log("Sending filter request with:", {
        prixMin: cleanPrixMin,
        prixMax: cleanPrixMax,
      });

      const response = await axios.get(`${API_BASE_URL}/oeuvres`, {
        params: {
          prixMin: cleanPrixMin,
          prixMax: cleanPrixMax,
        },
      });

      setArticles(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(
          `${error.response.status}: ${error.response.data.message || "Server-side error"}`,
        );
      } else {
        setError(`Client-side error: ${error.message}`);
      }
    } finally {
      setSpinner(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

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

      {/* On met les property dans ToastContainer, pour pouvoir le réutiliser facilement si besoin dans un autre toast.error par exemple dans le même component, sans devoir tout réecrire */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        progress={undefined}
        theme="colored"
        transition={Slide}
      />

      <div className="mt-2">
        <Header />
      </div>

      <div className="padding">
        <section className="mb-4 mt-6 text-center">
          <h1 className="martian-mono mb-3 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mx-[-15px] max-lg:mb-2 max-lg:text-[27px]">
            Toutes les oeuvres d'art
          </h1>
          <p className="font-roboto text-xl text-gray-800">
            Entrez un <strong>prix minimum</strong> et/ou{" "}
            <strong>maximum</strong> pour voir les oeuvres adaptées à votre{" "}
            <strong>budget</strong>
          </p>
        </section>

        <div className="relative mx-auto flex justify-center max-lg:w-auto max-lg:flex-col max-lg:items-center ">
          {/* Prix Min */}
          <div className="relative max-lg:mb-3">
            <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
              <SlMagnifier color="black" />
            </div>
            <input
              type="text"
              className="relative mr-10 rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:mr-0 max-lg:pl-10"
              placeholder="Prix minimum"
              value={prixMin}
              onChange={(e) => setPrixMin(e.target.value)}
            />
          </div>

          {/* Prix Max */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
              <SlMagnifier color="black" />
            </div>
            <input
              type="text"
              className="relative rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
              placeholder="Prix Maximum"
              value={prixMax}
              onChange={(e) => setPrixMax(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className=" max-lg:mt-4 ">
            <button
              className="ml-10 rounded-full bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md max-lg:mx-auto"
              onClick={handleFilter}
            >
              Filtrer
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          {error ? (
            <p>Error: {error}</p>
          ) : articles.length === 0 ? (
            <p className="mt-10 text-center text-lg text-gray-600">
              Utilisez le filtre pour afficher les oeuvres correspondant à votre
              budget.
            </p>
          ) : spinner ? ( //: spinner ? = Else if spinner is true
            <div className="my-20 flex items-center justify-center">
              <PulseLoader color="#FA7A35" size={40} />
            </div>
          ) : (
            <div className="mx-20 mt-14 grid grid-cols-4 gap-16 max-lg:mx-[-25px] max-lg:mt-10 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-6 ">
              {articles.map((e) => (
                <Link
                  to={`/${encodeURIComponent(e.auteur)}/${e.code}`}
                  key={e._id}
                >
                  <div
                    className=" w-full rounded-lg border border-gray-400 transition-transform hover:translate-y-[-5px] hover:cursor-pointer hover:shadow-custom"
                    onClick={scrollToTop}
                  >
                    <div className="h-60 w-full max-lg:h-52">
                      <img
                        className="h-full w-full rounded-t-lg object-cover"
                        src={e.imageUrl}
                        alt={e.auteur}
                      />
                    </div>
                    <div className="h-[167px] text-center text-xl max-lg:h-[184px]">
                      <h3 className="my-1 flex h-[14px] items-center justify-center font-mono font-bold text-blue-600 max-lg:h-[18px] max-lg:text-lg ">
                        {e.type}
                      </h3>
                      <div className="mx-auto w-1/2 border-b border-gray-300"></div>
                      <h4 className=" font-roboto my-4 flex h-9 items-center justify-center leading-tight text-gray-800 max-lg:h-10 ">
                        {e.infoArticle}
                      </h4>
                      <div className=" mx-auto my-1 w-1/2 border-b border-gray-300"></div>

                      <h4 className="font-roboto my-2 flex h-8 items-center justify-center leading-tight text-red-500 max-lg:h-10">
                        {e.auteur}
                      </h4>
                      <div className=" mx-auto w-1/2 border-b border-gray-300"></div>

                      <h4 className="font-roboto flex h-8 items-center justify-center text-[#00A170]">
                        {e.prix}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default Oeuvres;
