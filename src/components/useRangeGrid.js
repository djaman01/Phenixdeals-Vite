import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useRangeGrid({ endpoint, filterEndpoint }) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); //To store on filtered articles and map on it if isFiltering === true

  const [spinner, setSpinner] = useState(true); //State pour afficher le spinner lors du chargement des données à partir de la base de donnée
  const [loadingMore, setLoadingMore] = useState(false); //New Spinner for loading more articles in the bottom
  const [loadingMoreFiltered, setLoadingMoreFiltered] = useState(false); //Loading more spinner when scroll to bottom for filtered page

  const [error, setError] = useState("");

  const [isFiltering, setIsFiltering] = useState(false); //So that the useEffect don't run when i use teh filter

  //Pour créer un filtre par prix min et max
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const [resetKey, setResetKey] = useState(0); //To trigger the fetching after reset

  const [page, setPage] = useState(1); //To fetch 20 articles then when i scroll to the bottom of the page it fetches 40 more automatically
  const [pageFiltered, setPageFiltered] = useState(1); //Scroll infinite after filtering

  const [hasMore, setHasMore] = useState(true); //In the beginning there is more articles so it has to be true => then when there is no more articles it'll turn false
  const [hasMoreFiltered, setHasMoreFiltered] = useState(true); //If had more or filtered pages when scroll to bottom

  //-----------------------Handlers-----------------------------

  const notifyError = () => {
    toast.error("Entrez un prix minimum et/ou maximum avant de filtrer");
  };

  //To catch the values entered from the price inputs
  const handlePrixMin = (e) => setPrixMin(e.target.value);
  const handlePrixMax = (e) => setPrixMax(e.target.value);

  const handleReset = () => {
    setIsFiltering(false);
    setFilteredArticles([]);
    setPrixMin("");
    setPrixMax("");
    setPage(1); //If we filter and reset directly, it'll not work, because the value of page stay 1 if we don't scroll down to the bottom and load new articles
    setResetKey((prev) => prev + 1); //To trigger the 1st useEffect after Reset
    setPageFiltered(1);
    setHasMoreFiltered(true);
    setSpinner(true);
    setLoadingMoreFiltered(false);
  };

  //-----------------------Fetching Articles And Infinite scroll: When No Filters-----------------------------

  //1st Render of the articles when the user get to the page
  useEffect(() => {
    if (isFiltering) return; //If filtering, don't reFecth articles

    const fecthArticles = async () => {
      if (!hasMore && page > 1) {
        return;
      } else if (hasMore && page > 1) {
        setLoadingMore(true);
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
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

    fecthArticles();
  }, [API_BASE_URL, page, resetKey]); //Pour relancer la function quand on change de page (arrive en bas de page et qu'il y a plus d'articles)

  //Scroll Detection: to know that the user has arrived to the bottom of the page + add +1 to the statePage to re-run the first useEffect and fetch 20 newArticles if available
  useEffect(() => {
    const handleScroll = () => {
      //Object destructuring différent de Array destructuting / Here const scrollTop = document.documentElement.scrollTop Et non pas scrollTop = document.documentEleme,nt like in array destructuring
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      // scrollTop → how many pixels the user has scrolled down already / clientHeight → the visible height of the viewport / scrollHeight → the total height of the document including what's not visible
      if (
        //If the user arrive at 800px before the bottom of the page And we're not loading more articles and there are more articles, add +1 to the value of the state page
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

  //-----------------------Fetching Articles And Infinite scroll: When Filters-----------------------------

  //To apply filter => isFiltering === true on map sur filteredArticles
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

      const response = await axios.get(`${API_BASE_URL}/${filterEndpoint}`, {
        params: {
          prixMin: cleanPrixMin,
          prixMax: cleanPrixMax,
          page,
          limit: 20,
          BestDeal: true, //So that it can find it and filter it from the server
        },
      });
      const filterResult = response.data;
      //If handleFilter(1, true) = When the user click on Filtrer = "Replace the list in the first render with the filtered articles." / handleFilter(pageFiltered, false) = scroll down = "I'm loading more not filtering again, so append more filtered Articles if available."
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

  //To filter by price when we clik on "Filtrer" => call the handleFilter function with new params (1, true) and isFiltering=== true to map on filteredArticles state
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

  //Scroll detection for the filtered page => add +1 to the state pageFiltered to call the useEffect below
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

  // Infinite scroll for filtered results => call the handleFilter function with new params (numOfPage, false) => to append new filteredArticles on the old ones (voir handleFilter)
  useEffect(() => {
    if (!isFiltering) return;
    if (pageFiltered === 1) return; // Already fetched in onApplyFilter
    handleFilter(pageFiltered, false); // pageFiltered +1 when scroll to the bottom + newFilter === false, to append the results to the old results (infinite scroll) => voir function handleFilter après response.data
    // eslint-disable-next-line
  }, [API_BASE_URL, pageFiltered]);

  //variable that store the Array in which we will map depending on filtering or not
  const articlesToDisplay = isFiltering ? filteredArticles : articles;

  //Variables that stores the spinner that will appear depending on filtering or not AND scrolling to bottom or not
  const initialLoading = spinner;

  const isBottomLoading = isFiltering ? loadingMoreFiltered : loadingMore;

  //useRangeGrid.js is a hook: it should only return an "Object" with data and functions, not UI elements like <div></div>
  return {
    //data
    articlesToDisplay,
    error,

    //loading spinners
    initialLoading,
    isBottomLoading,

    //filter States
    prixMin,
    prixMax,
    isFiltering,

    //handlers
    handlePrixMin,
    handlePrixMax,
    handleReset,
    onApplyFilter,
  };
}

export default useRangeGrid;
