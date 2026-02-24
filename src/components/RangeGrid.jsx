import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

import { PulseLoader } from "react-spinners";

const RangeGrid = ({
  title,
  subtitle,
  prixMin,
  prixMax,
  handlePrixMin,
  handlePrixMax,
  handleFilter,
  handleReset,
  showReset,
  articles,
  error,
  loading,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div className="padding">
      {/* Title */}
      <section className="mb-4 mt-6 text-center">
        <h1 className="martian-mono mb-3 bg-gradient-to-r from-[#B5121B] via-[#FA7A35] to-[#F7C331] bg-clip-text text-3xl text-transparent max-lg:mx-[-15px] max-lg:mb-2 max-lg:text-[27px]">
          {title}
        </h1>

        {subtitle && (
          <p className="font-roboto text-xl text-gray-800">{subtitle}</p>
        )}
      </section>

      {/* Filters */}
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
            onChange={handlePrixMin}
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
            onChange={handlePrixMax}
          />
        </div>

        <div className=" max-lg:mt-4 max-lg:flex max-lg:flex-row-reverse max-lg:justify-between">
          <button
            className="ml-4 rounded-full bg-green-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md active:scale-105"
            onClick={handleFilter}
          >
            Filtrer
          </button>
          {showReset && (
            <button
              className="ml-4 rounded-full bg-red-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md active:scale-105 max-lg:ml-0"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : loading ? ( //Affichage du spinner si 'loading' prop = true
          <div className="my-20 flex items-center justify-center">
            <PulseLoader color="#FA7A35" size={40} />
          </div>
        ) : !loading && articles.length === 0 ? ( //If loading is over and still no articles founs => show the message
          <div className="flex flex-col items-center justify-center gap-2">
            <p className=" font-roboto mt-10 text-center text-lg text-gray-500">
              Aucune oeuvre disponible dans cette fourchette de prix
            </p>
            <p className=" font-roboto text-center text-lg text-gray-500">
              Essayez un autre filtre
            </p>
          </div>
        ) : (
          <div className="mx-10 mt-14 grid grid-cols-4 gap-16 max-lg:mx-[-25px] max-lg:mt-10 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-6 ">
            {articles.map((e) => (
              <Link
                to={`/${encodeURIComponent(e.auteur)}/${e.code}`}
                key={e._id}
              >
                <div
                  className="w-full rounded-lg border border-gray-400 transition-transform hover:scale-[1.03] hover:cursor-pointer hover:shadow-custom active:scale-100"
                  onClick={scrollToTop}
                >
                  <div className="h-64 w-full max-lg:h-52">
                    {/* Tjs mettre height et width à l'image pour améliroer les performance: 1) Mettre la console google en bas de page pour que les images gardent la bonne taille 2) cliquer sur inspect et hover sur l'image 3) Copier les même Largeur x Longueurs ecrites */}
                    <img
                      className="h-full w-full rounded-t-lg object-cover"
                      src={e.imageCard}
                      alt={e.auteur}
                      width={287}
                      height={256}
                      loading="lazy"
                    />
                  </div>
                  {/* j'utilise une fixed height en responsive, pour ne pas que les cards aient des longueurs différentes */}
                  <div className="h-[148px] text-center text-xl max-lg:h-[163px]">
                    <h3 className="font-roboto-bold mt-1 flex items-center justify-center text-[#2660cb] ">
                      {e.type}
                    </h3>
                    <div className="mx-auto w-1/2 border-b border-gray-300"></div>
                    <h4 className=" font-roboto my-2 flex items-center justify-center leading-tight text-gray-800 max-lg:my-2  ">
                      {e.infoArticle}
                    </h4>
                    <div className=" mx-auto w-1/2 border-b border-gray-300"></div>

                    <h4 className="font-roboto my-2 flex items-center justify-center leading-tight text-[#ce0e18] max-lg:my-3 max-lg:h-8">
                      {e.auteur}
                    </h4>
                    <div className=" mx-auto w-1/2 border-b border-gray-300"></div>

                    <h4 className=" font-roboto my-1 flex items-center justify-center text-[#027254]">
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
