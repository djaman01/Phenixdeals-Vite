import { Helmet } from "react-helmet-async";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { FadeLoader } from "react-spinners";
import { Slide, ToastContainer } from "react-toastify";
import RangeGrid from "../components/RangeGrid";
import useRangeGrid from "../components/useRangeGrid";

const BestDeals = () => {
  //Exporting variables and handlers from useRangGrid.js Hook by using Destructure, and defining the 2 endpoints in the parameters
  const {
    articlesToDisplay,
    error,
    initialLoading,
    isBottomLoading,
    prixMin,
    prixMax,
    isFiltering,
    handlePrixMin,
    handlePrixMax,
    handleReset,
    onApplyFilter,
  } = useRangeGrid({
    endpoint: "bestDeals",
    filterEndpoint: "filterBestDeals",
  });

  return (
    <>
      <Helmet>
        {/* Balise pour gérer le responsive quelque soit la taille de l'écran:  */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title> Best Deals | Phenix Deals</title>
        <meta
          name="description"
          content="Découvrez les meilleures affaires sur Phenixdeals.com: une collection d'oeuvres d'art uniques et aux meilleurs prix !"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://phenixdeals.com/bestDeals" />

        <meta property="og:title" content="Best Deals | Phenix Deals" />

        <meta
          property="og:description"
          content="Découvrez les meilleures affaires sur Phenixdeals.com: une collection d'oeuvres d'art uniques et aux meilleurs prix !"
        />
        <meta
          property="og:image"
          content="https://www.phenixdeals.com/assets/phenix-nobg-gGMQJlPS.png"
        />

        <link rel="canonical" href="https://phenixdeals.com/bestDeals" />
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
          title="Les Meilleures Affaires"
          subtitle="Découvrez notre selection d'oeuvres d'art uniques aux meilleurs prix !"
          prixMin={prixMin}
          prixMax={prixMax}
          handlePrixMin={handlePrixMin}
          handlePrixMax={handlePrixMax}
          handleFilter={onApplyFilter}
          showReset={isFiltering} //To show the reset Button only after applying filter
          handleReset={handleReset}
          error={error}
          loading={initialLoading}
        />

        {isBottomLoading && (
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

export default BestDeals;
