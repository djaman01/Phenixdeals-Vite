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
    <main>

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
          className="relative w-full rounded-full border border-gray-400 py-3 pl-12 hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      <div>
        {error ? <p>Error: {error}</p> :
          <div>
            {filteredArticles.map((e)=>
              <div key={e._id}>
                <div>
                  <h1>{e.type}</h1>
                  <h2>{e.auteur}</h2>
                </div>

              </div>
            )}
          </div>
        }
      </div>

    </main>
  );
};

export default CardGrid;
