import { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

import { PulseLoader } from "react-spinners";

const RangeGrid = ({
  auteur,
  bestDeals,
  homePage,
  title,
  error,
  allValues,
  showSearchInput,
  typeObjet,
  loading,
}) => {
  //Pour créer un filtre par prix min et max
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const handlePrixMin = (e) => setPrixMin(e.target.value);
  const handlePrixMax = (e) => setPrixMax(e.target.value);

  //State pour store les values de l'input où le visiteur va écrire le type d'objet qu'il cherche et qu'on va comparer pa rapport à la valeur infoArticle de l'élément
  const [inputSearch, setInputSearch] = useState("");

  const [filteredArticles, setFilteredArticles] = useState(allValues); //On va map sur filteredArticles

  //Quand on utilise un "props" dans le initial value d'une state variable, on est obligé d'utiliser useEffect, pour que la state variable se mette à jour quand le props change, sinon React ne comprend pas
  useEffect(() => {
    setFilteredArticles(allValues);
  }, [allValues]);

  const handleFilter = () => {
    //Quand on va cliquer sur le bouton filtrer, ça va activer ce code qui au final va changer la valeur de filteredArticles qui est l'array sur laquel on map, et donc va filtrer les élemenst en fonction de la selection faite

    //To replace the number written by the visitor, with another number with no space, so we can compare them
    const minPrice = prixMin
      ? parseFloat(prixMin.replace(/\s+/g, "")) //Transform the number written by the visitor with a string with no spaces so we can compare numbers / then convert the cleaned string back into a number using parseFloat
      : -Infinity; //If prixMin is not provided, set minPrice to -Infinity to ensure any comparison will succeed

    const maxPrice = prixMax
      ? parseFloat(prixMax.replace(/\s+/g, ""))
      : Infinity;

    const filtered = allValues.filter((e) => {
      const price = parseFloat(e.prix.replace(/\s+/g, "")); //Prix de l'élément qu'on remplace au même format que les prix min et max précédents
      const filterByPrice = price >= minPrice && price <= maxPrice;
      const filterByInfoArticle = e.infoArticle
        .toLowerCase()
        .includes(inputSearch.toLowerCase());

      return filterByPrice && filterByInfoArticle;
    });

    // Sort filtered articles by price in ascending order
    const sortedFiltered = filtered.sort((a, b) => {
      const priceA = parseFloat(a.prix.replace(/\s+/g, ""));
      const priceB = parseFloat(b.prix.replace(/\s+/g, ""));
      return priceA - priceB;
    });

    setFilteredArticles(sortedFiltered);
  };

  const handleReset = () => {
    setPrixMin("");
    setPrixMax("");
    setInputSearch("");
    setFilteredArticles(allValues); //Pour revoir tous les éléments sans filtre
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="padding">
      <section className="mb-4 mt-6 text-center">
        <h1 className="martian-mono mb-2 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mx-[-15px] max-lg:mb-1 max-lg:text-[27px]">
          {title}
        </h1>
        {auteur ? (
          <p className="font-roboto text-xl text-gray-800">
            <strong>Cliquez </strong> sur une oeuvre pour la voir en détail et
            nous contacter si intéressé.
          </p>
        ) : bestDeals ? (
          <p className="font-roboto text-xl text-gray-800">
            Découvrez notre selection d'oeuvres d'art uniques aux{" "}
            <strong>meilleurs prix !</strong>
          </p>
        ) : homePage ? (
          <p className="font-roboto text-xl text-gray-800">
            Utilisez le <strong>filtre</strong> pour découvrir les oeuvres
            adaptées à votre <strong>budget</strong>
          </p>
        ) : (
          <p className="font-roboto text-xl text-gray-800">
            Utilisez le <strong>filtre </strong>
            pour découvrir les oeuvres adaptées à votre <strong>budget</strong>
          </p>
        )}
      </section>

      <div className="relative mx-auto flex justify-center max-lg:w-auto max-lg:flex-col max-lg:items-center ">
        {/* Je veux que ce 1er input n'apparaisse que pour déco et Bijoux, donc je vais faire une condition avec un props */}

        {showSearchInput && (
          <div className="relative max-lg:mb-3">
            {/* top-1/2 positionne le top du div à la moitié de son parent (donc il parait bas): c'est pourquoi on rajoute transform et -translate-y-1/2 pour le bouger en haut by the half of it's own height */}
            <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
              <SlMagnifier color="black" />
            </div>

            {/*!!! pl-12 dans input, permet de déplacer le départ pour écrire*/}
            <input
              type="text"
              className="relative mr-10 rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:mr-0 max-lg:pl-10"
              placeholder={typeObjet}
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>
        )}

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
            onClick={handleFilter}
          >
            Filtrer
          </button>
          <button
            className="ml-4 rounded-full bg-red-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md max-lg:ml-0"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? ( //Affichage du spinner si 'loading' prop = true
          <div className="my-20 flex items-center justify-center">
            <PulseLoader color="#FA7A35" size={40} />
          </div>
        ) : (
          <div className="mx-20 mt-14 grid grid-cols-4 gap-16 max-lg:mx-[-25px] max-lg:mt-10 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-6 ">
            {filteredArticles.map((e) => (
              <Link
                to={`/${encodeURIComponent(e.auteur)}/${e.code}`}
                key={e._id}
              >
                <div
                  key={e._id}
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
  );
};

export default RangeGrid;
