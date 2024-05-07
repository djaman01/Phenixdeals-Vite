import React from "react";

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

      <div className="mx-auto mt-4 w-1/4 relative max-lg:w-3/4"> {/* Add relative positioning */}
        {/* Magnifier icon */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </div>

        {/* Input field */}
        <input
          type="text"
          className="pl-12 relative w-full rounded-full border border-gray-300 py-3 focus:border-blue-500 focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

    </main>
  );
};

export default CardGrid;
