import { Helmet } from "react-helmet-async";

import axios from "axios";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

import { FadeLoader, PulseLoader } from "react-spinners";
import { Slide, ToastContainer, toast } from "react-toastify";

const Oeuvres = () => {
  const notifyError = () =>
    toast.error("Entrez un prix minimum et/ou maximum avant de filtrer");

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  const [isFiltering, setIsFiltering] = useState(false); //So that the useEffect don't run when i use teh filter
  const [filteredArticles, setFilteredArticles] = useState([]); //To store on filtered articles and map on int if isFiltering === true

  //Pour créer un filtre par prix min et max
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const handlePrixMin = (e) => setPrixMin(e.target.value);
  const handlePrixMax = (e) => setPrixMax(e.target.value);

  const [resetKey, setResetKey] = useState(0); //To trigger the fetching after reset

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  //To fetch 20 articles then when i scroll to the bottom of the page it fetches 40 more automatically
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); //In the beginning there is more articles so it has to be true => then when there is no more articles it'll turn false
  const [loadingMore, setLoadingMore] = useState(false); //New Spinner for loading more articles in the bottom

  //Scroll infinote after filtering
  const [pageFiltered, setPageFiltered] = useState(1);
  const [hasMoreFiltered, setHasMoreFiltered] = useState(true); //In the beginning there is more articles so it has to be true => then when there is no more articles it'll turn false
  const [loadingMoreFiltered, setLoadingMoreFiltered] = useState(false); //New Spinner for loading more articles in the bottom

  useEffect(() => {
    if (isFiltering) return; //If filtering, don't reFecth articles

    const fecthAndAppend = async () => {
      if (!hasMore && page > 1) {
        return;
      } else if (hasMore && page > 1) {
        setLoadingMore(true);
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/allOeuvres`, {
          params: { page: page, limit: 20 },
        });
        const newArticles = response.data; // les 20 oeuvres ou - si on arrive à la fin

        setArticles((prev) =>
          page === 1 ? newArticles : [...prev, ...newArticles],
        );
        setHasMore(newArticles.length > 0); // To turn hasMore to false if there is no more article when we reach the bottom of the page
      } catch (error) {
        console.error(
          error.response
            ? `${error.response.status}: ${error.response.data.message}` //server-side error
            : `Error: ${error.message}`, //client-side error
        );
        setError("An error occurred while fetching data");
      } finally {
        setSpinner(false); //Après avoir fecth les données setLoading devient false pour afficher les tableaux au lieu du spinner
        setLoadingMore(false);
      }
    };

    fecthAndAppend();
  }, [API_BASE_URL, page, resetKey]); //Pour relancer la function quand on change de page (arrive en bas de page et qu'il y a plus d'articles)

  //Scroll Detection to know that the user hass arrived to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      //Object destructuring différent de Array destructuting / Here const scrollTop = document.documentElement.scrollTop Et non pas scrollTop = document.documentEleme,nt like in array destructuring
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      // scrollTop → how many pixels the user has scrolled down already / clientHeight → the visible height of the viewport / scrollHeight → the total height of the document including what's not visible
      if (
        //If the user arrive at 800px before the bottom of the page And we're not loading more articles and there are more articles, add +1 to the value of the state page, so that it activates the first useEffect to fetch more articles
        scrollTop + clientHeight >= scrollHeight - 800 &&
        !loadingMore &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);

  //For Infinite Scroll: I will call this function inside a useEffect so that the code can re-run when the user scroll down to the bottom and the "pagination" change
  const handleFilter = async (page = 1, newFilter = false) => {
    if (!prixMin && !prixMax) {
      notifyError();
      return;
    }
    try {
      const cleanPrixMin = prixMin
        ? parseInt(prixMin.replace(/[^\d]/g, ""), 10)
        : undefined;
      const cleanPrixMax = prixMax
        ? parseInt(prixMax.replace(/[^\d]/g, ""), 10)
        : undefined;

      const response = await axios.get(`${API_BASE_URL}/filterOeuvres`, {
        params: {
          prixMin: cleanPrixMin,
          prixMax: cleanPrixMax,
          page,
          limit: 20,
        },
      });
      const filterResult = response.data;
      //Now when we apply a new filter handleFilter(1, true) we are saying: "I'm starting a new filter, so replace the list." / When we scroll down the bottom of the page and call handleFilter(pageFiltered, false), we say: "I'm loading more, so append to the list."
      setFilteredArticles((prev) =>
        newFilter ? filterResult : [...prev, ...filterResult],
      );
      setHasMoreFiltered(filterResult.length > 0);
      setError("");
    } catch (error) {
      console.error(
        "Error Fetching oeuvres:",
        error.response
          ? `${error.response.status}: ${error.response.data.message}` // Server-side error
          : error.message, // Client-side error
      );
    } finally {
      setSpinner(false);
      setLoadingMoreFiltered(false);
    }
  };

  // A mettre dans le onClick du bouton "Filtrer" pour appeler handleFilter avec pageFiltered = 1 et newFilter === true
  const onApplyFilter = async () => {
    if (!prixMin && !prixMax) {
      //Obligé de le réecrire ici, sinon ca va mettre setSpinner(true) et on va le voir sans rien fetch
      notifyError();
      return;
    }
    setSpinner(true);
    setIsFiltering(true);
    setPageFiltered(1);
    setHasMoreFiltered(true);
    setLoadingMoreFiltered(false);
    await handleFilter(1, true); // Fetch first page directly and set teh apram newFilter to true
  };

  //In the filtered page: when the user scroll until the bottom of th page -800px, it add +1 to the state pageFiltered, that will activate the useEffect below to re-run the handleFilter
  useEffect(() => {
    const handleScrollFilter = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 800 &&
        !loadingMoreFiltered &&
        hasMoreFiltered &&
        isFiltering
      ) {
        setLoadingMoreFiltered(true);
        setPageFiltered((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScrollFilter);
    return () => window.removeEventListener("scroll", handleScrollFilter);
  }, [loadingMoreFiltered, hasMoreFiltered, isFiltering]);

  //Re-runs the handleFilter when pageFiltered > 1
  useEffect(() => {
    if (!isFiltering) return;
    if (pageFiltered === 1) return; // Already fetched in onApplyFilter
    handleFilter(pageFiltered, false); // pageFiltered +1 when scroll to the bottom + newFilter === false, to append the results to the old results (infinite scroll) => voir function handleFilter après response.data
    // eslint-disable-next-line
  }, [API_BASE_URL, pageFiltered]);

  const handleReset = () => {
    setIsFiltering(false);
    setFilteredArticles([]);
    setPrixMin("");
    setPrixMax("");
    setPage(1); //If we filter and reset directly, it'll not work, because the value of page stay 1 if we don't scroll down to the bottom and load new articles
    setResetKey((prev) => prev + 1); //To trigger the 1st useEffect after Reset
    setSpinner(true);
    setLoadingMoreFiltered(false);
    setPageFiltered(1);
    setHasMoreFiltered(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const articlesToDisplay = isFiltering ? filteredArticles : articles;

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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        progress={undefined}
        theme="colored"
        transition={Slide}
      />
      <div className="mt-2">
        <Header />
      </div>

      <div className="padding">
        <div className="mb-4 mt-6 text-center">
          <h1 className="martian-mono mb-3 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mx-[-15px] max-lg:mb-2 max-lg:text-[27px]">
            Toutes les oeuvres d'art
          </h1>
          <p className="font-roboto text-xl text-gray-800">
            Utilisez le <strong>filtre</strong> pour découvrir les oeuvres
            adaptées à votre <strong>budget</strong>
          </p>
        </div>

        <div className="relative mx-auto flex justify-center max-lg:w-auto max-lg:flex-col max-lg:items-center ">
          <div className="relative max-lg:mb-3">
            <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
              <SlMagnifier color="black" />
            </div>

            <input
              type="text"
              className="relative mr-10 rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:mr-0 max-lg:pl-10"
              placeholder="Prix minimum"
              value={prixMin}
              onChange={handlePrixMin}
            />
          </div>

          <div className="relative">
            <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
              <SlMagnifier color="black" />
            </div>

            <input
              type="text"
              className="relative rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
              placeholder="Prix Maximum"
              value={prixMax}
              onChange={handlePrixMax}
            />
          </div>

          <div className=" max-lg:mt-4 max-lg:flex max-lg:flex-row-reverse max-lg:justify-between">
            <button
              className="ml-4 rounded-full bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md"
              onClick={onApplyFilter}
            >
              Filtrer
            </button>
            {isFiltering && (
              <button
                className="ml-4 rounded-full bg-red-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md max-lg:ml-0"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div>
          {error ? (
            <p>Error: {error}</p>
          ) : spinner ? ( //Affichage du spinner si 'loading' prop = true
            <div className="my-20 flex items-center justify-center">
              <PulseLoader color="#FA7A35" size={40} />
            </div>
          ) : (
            <div className="mx-20 mt-14 grid grid-cols-4 gap-16 max-lg:mx-[-25px] max-lg:mt-10 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-6 ">
              {articlesToDisplay.map((e) => (
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

        {(loadingMore || loadingMoreFiltered) && (
          <div className="my-10 flex items-center justify-center">
            <FadeLoader color="#FA7A35" size={40} />
          </div>
        )}
      </div>

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default Oeuvres;
