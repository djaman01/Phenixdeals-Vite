import { useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { Link } from "react-router-dom";

const RangeGrid = ({
  title,
  minValue,
  maxValue,
  ChangePrixMin,
  ChangePrixMax,
  error,
  filteredArticles,
  onClick,
  onFilter,
  reset,
}) => {
  return (
    <main className="padding">
      <div className="martian-mono mb-10 text-center text-3xl text-[#FA7A35]">
        <h1>{title}</h1>
      </div>

      <div className="relative mx-auto mt-4 flex justify-center w-1/4 max-lg:w-auto">
        <input
          type="text"
          className="relative mr-10 w-96 rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
          placeholder="Prix minimum"
          value={minValue}
          onChange={ChangePrixMin}
        />
        <input
          type="text"
          className="relative w-96 rounded-full border border-gray-400 py-3 pl-12 transition duration-150 ease-in-out hover:shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 max-lg:pl-10"
          placeholder="Prix Maximum"
          value={maxValue}
          onChange={ChangePrixMax}
        />

        <button
          className="ml-4 rounded-full bg-blue-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md"
          onClick={onFilter}
        >
          Appliquer
        </button>
        <button
          className="ml-4 rounded-full bg-blue-500 px-4 py-2 text-white transition duration-150 ease-in-out hover:shadow-md"
          onClick={reset}
        >
          Reset
        </button>
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
                      src={`http://localhost:3005/${e.imageUrl}`}
                      alt={e.auteur}
                    />
                  </div>
                  <div className="h-[158px] text-center text-xl max-lg:h-[164px] ">
                    <h3 className="my-1 flex h-7 items-center justify-center font-mono font-bold text-blue-600  ">
                      {e.type}
                    </h3>
                    <div className="mx-auto w-1/2 border-b border-gray-300"></div>
                    <h4 className=" font-roboto my-1 flex h-9 items-center justify-center text-gray-800 max-lg:h-10 ">
                      {e.infoArticle}
                    </h4>
                    <div className=" mx-auto my-1 w-1/2 border-b border-gray-300"></div>

                    <h4 className="font-roboto flex h-9 items-center justify-center text-red-500 max-lg:h-10">
                      {e.auteur}
                    </h4>
                    <div className=" mx-auto my-1 w-1/2 border-b border-gray-300"></div>

                    <h4 className="flex h-7 items-center justify-center font-mono text-blue-600 ">
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

export default RangeGrid;
