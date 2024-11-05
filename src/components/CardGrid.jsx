import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

const CardGrid = ({
  title,
  value,
  onChange,
  placeholder,
  error,
  filteredArticles,
  onClick,
}) => {
  return (
    <main className="padding">
      <div className="martian-mono mb-10 text-center text-3xl text-[#FA7A35]">
        <h1>{title}</h1>
      </div>

      <div className="relative mx-auto mt-4 w-1/4 max-lg:w-auto">
        {/* top-1/2 positionne le top du div à la moitié de son parent (donc il parait bas): c'est pourquoi on rajoute transform et -translate-y-1/2 pour le bouger en haut by the half of it's own height */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
          <SlMagnifier color="black" />
        </div>

        {/*!!! pl-12 dans input, permet de déplacer le départ pour écrire*/}
        <input
          type="text"
          className="relative w-full rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="mx-20 mt-14 grid grid-cols-4 gap-16 max-lg:mx-[-20px] max-lg:mt-10 max-lg:grid-cols-2 max-lg:gap-x-3 max-lg:gap-y-6 ">
            {filteredArticles.map((e) => (
              <Link to={`/ficheArticle/${e._id}`} key={e._id}>
                <div
                  key={e._id}
                  className=" w-full rounded-lg border border-gray-400 transition-transform hover:translate-y-[-5px] hover:cursor-pointer hover:shadow-custom"
                  onClick={onClick}
                >
                  <div className="h-60 w-full max-lg:h-52">
                    <img
                      className="h-full w-full rounded-t-lg object-cover"
                      src={e.imageUrl}
                      alt={e.auteur}
                    />
                  </div>
                  <div className="h-[165px] text-center text-xl max-lg:h-[186px]">
                    <h3 className="my-1 flex h-7 items-center justify-center font-mono font-bold text-blue-600  ">
                      {e.type}
                    </h3>
                    <div className="mx-auto w-1/2 border-b border-gray-300"></div>
                    <h4 className=" font-roboto my-3 flex h-8 items-center justify-center leading-tight text-gray-800 max-lg:h-12 ">
                      {e.infoArticle}
                    </h4>
                    <div className=" mx-auto my-1 w-1/2 border-b border-gray-300"></div>

                    <h4 className="font-roboto my-2 flex h-8 items-center justify-center leading-tight text-red-500 max-lg:h-10">
                      {e.auteur}
                    </h4>
                    <div className=" mx-auto w-1/2 border-b border-gray-300"></div>

                    <h4 className="flex h-7 items-center justify-center font-mono font-bold text-[#00A170] ">
                      {e.prix}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CardGrid;
