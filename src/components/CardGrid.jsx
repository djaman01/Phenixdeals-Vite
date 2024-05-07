import { SlMagnifier } from "react-icons/sl";

const CardGrid = ({
  title,
  value,
  onChange,
  placeholder,
  error,
  filteredProducts,
}) => {
  return (
    <main>

      <div className="text-center">
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
          className="relative w-full rounded-full border border-gray-300 py-3 pl-12 hover:shadow-md focus:border-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

    </main>
  );
};

export default CardGrid;
