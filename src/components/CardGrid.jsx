import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";

const CardGrid = ({
  title,
  value,
  onChange,
  placeholder,
  error,
  filteredArticles,
}) => {
  return (
    <main className="padding">
      <div className="font-roboto text-center">
        <h1>{title}</h1>
      </div>

      <div className="relative mx-auto mt-4 w-1/4 max-lg:w-3/4">
        {/* top-1/2 positionne le top du div à la moitié de son parent (donc il parait bas): c'est pourquoi on rajoute transform et -translate-y-1/2 pour le bouger en haut by the half of it's own height */}
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform text-gray-500">
          <SlMagnifier color="black" />
        </div>

        {/*!!! pl-12 dans input, permet de déplacer le départ pour écrire*/}
        <input
          type="text"
          className="relative w-full rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="mt-14 grid grid-cols-4 gap-16 mx-20 ">
            {filteredArticles.map((e) => (
              <div
                key={e._id}
                className="w-full rounded-lg border border-gray-400 transition-transform hover:translate-y-[-5px] hover:cursor-pointer hover:shadow-custom"
              >
                <div className="h-60 w-full">
                  <img
                    className="h-full w-full rounded-t-lg object-cover"
                    src={`http://localhost:3005/${e.imageUrl}`}
                    alt={e.auteur}
                  />
                </div>
                <div className="text-center h-36 text-xl">
                  <h3 className="mt-1 mb-2 font-mono font-bold text-blue-600">{e.type}</h3>
                  <h4 className="mb-2 font-roboto text-gray-800">{e.infoArticle}</h4>
                  <h4 className="mb-2 font-roboto text-red-500">{e.auteur}</h4>
                  <h4 className="font-mono text-blue-600">{e.prix}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CardGrid;
