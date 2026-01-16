import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Slide, ToastContainer, toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RangeGrid from "../components/RangeGrid";

const PageArtist = () => {
  const { auteur } = useParams(); //On tire le paramètre à la fin de l'url, qui est le nom de l'artiste, définit dans le component AllArtists, dans le lien quand on clique sur le nom de l'artiste

  // Access API base URL from env
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée

  const [isFiltering, setIsFiltering] = useState(false); //So that the useEffect don't run when i use teh filter
  const [filteredArticles, setFilteredArticles] = useState([]); //To store on filtered articles and map on it if isFiltering === true

  //Pour créer un filtre par prix min et max
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const [resetKey, setResetKey] = useState(0); //To trigger the fetching after reset

  //To fetch 20 articles then when i scroll to the bottom of the page it fetches 40 more automatically
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); //In the beginning there is more articles so it has to be true => then when there is no more articles it'll turn false
  const [loadingMore, setLoadingMore] = useState(false); //New Spinner for loading more articles in the bottom

  //Scroll infinote after filtering
  const [pageFiltered, setPageFiltered] = useState(1);
  const [hasMoreFiltered, setHasMoreFiltered] = useState(true); //In the beginning there is more articles so it has to be true => then when there is no more articles it'll turn false
  const [loadingMoreFiltered, setLoadingMoreFiltered] = useState(false); //New Spinner for loading more articles in the bottom

  const handlePrixMin = (e) => setPrixMin(e.target.value);
  const handlePrixMax = (e) => setPrixMax(e.target.value);

  const notifyError = () => {
    toast.error("Entrez un prix minimum et/ou maximum avant de filtrer");
  };

  const handleReset = () => {
    setIsFiltering(false);
    setFilteredArticles([]);
    setPrixMin("");
    setPrixMax("");
    setPage(1); //If we filter and reset directly, it'll not work, because the value of page stay 1 if we don't scroll down to the bottom and load new articles
    setResetKey((prev) => prev + 1); //To trigger the 1st useEffect after Reset
    setSpinner(true);
    setPageFiltered(1);
    setHasMoreFiltered(true);
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
    await handleFilter(1, true); // Fetch first page directly and set the param newFilter to true
  };

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

      const response = await axios.get(
        `${API_BASE_URL}/pageArtist/${encodeURIComponent(auteur)}`,
        {
          params: {
            prixMin: cleanPrixMin,
            prixMax: cleanPrixMax,
            page,
            limit: 20,
          },
        },
      );
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

  const articlesToDisplay = isFiltering ? filteredArticles : articles;

  //!!! Utiliser encodeURIComponent pour encoder le paramètre 'auteur' car il peut contenir des caractères spéciaux (espaces, &, etc.) => Cela assure une robustesse supplémentaire, même si les navigateurs modernes encodent déjà certains caractères comme l'espace en %20 par défaut
  useEffect(() => {
    if (isFiltering) return; //If filtering, don't reFecth articles

    const fecthAndAppend = async () => {
      if (!hasMore && page > 1) {
        return;
      } else if (hasMore && page > 1) {
        setLoadingMore(true);
      }
      try {
        const response = await axios.get(
          `${API_BASE_URL}/pageArtist/${encodeURIComponent(auteur)}`,
          {
            params: { page: page, limit: 20 },
          },
        );
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
  }, [API_BASE_URL, page, auteur, resetKey]); //Pour relancer la function quand on change de page (arrive en bas de page et qu'il y a plus d'articles)

  //Scroll Detection to know that the user hass arrived to the bottom of the page
  //“If we are NOT filtering, AND the user is close to the bottom, AND we are not already loading, AND there is still data to load → then load the next page.”
  useEffect(() => {
    const handleScroll = () => {
      //Object destructuring différent from Array destructuting / Here const scrollTop = document.documentElement.scrollTop (scrollTop is the key of the object)
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

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*On prend le nom de l'auteur tiré de l'url et stocké dans la variable auteur grâce à useParams; donc pas besoin de condition, car le paramètre est instantanément dispo  */}
        <title>{`Oeuvres de ${auteur} | Phenix Deals`}</title>

        <meta
          name="description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenixdeals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.phenixdeals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
        <meta
          property="og:title"
          content={`Tableaux de ${auteur} | Phenix Deals`}
        />
        <meta
          property="og:description"
          content={`Découvrez toutes les oeuvres de ${auteur} disponibles à la vente sur Phenixdeals.com: Cliquez sur une oeuvre pour la voir plus en détail !`}
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />
        {/* Pour éviter tout problème de contenu dupliqué. Cela renforce encore le SEO de chaque page artiste. */}
        <link
          rel="canonical"
          href={`https://www.phenixdeals.com/pageArtist/${encodeURIComponent(auteur)}`}
        />
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

      <section>
        <RangeGrid
          articles={articlesToDisplay}
          title={
            <>
              Toutes les oeuvres de{" "}
              <span style={{ color: "#000000" }}>{auteur}</span>
            </>
          }
          subtitle={
            <>
              <p className="font-roboto mx-2 text-xl text-gray-800">
                <strong>Cliquez</strong> sur une oeuvre pour plus d'informations
              </p>
            </>
          }
          prixMin={prixMin}
          prixMax={prixMax}
          handlePrixMin={handlePrixMin}
          handlePrixMax={handlePrixMax}
          handleFilter={onApplyFilter}
          showReset={isFiltering} //To show the reset Button only after applying filter
          handleReset={handleReset}
          error={error}
          loading={spinner}
        />

        {(loadingMore || loadingMoreFiltered) && (
          <div className="my-10 flex items-center justify-center">
            <FadeLoader color="#FA7A35" size={40} />
          </div>
        )}
      </section>

      <div className="pt-8">
        <Footer />
      </div>
    </>
  );
};

export default PageArtist;
