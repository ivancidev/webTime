import React from "react";
import SearchIcon from "../../../icons/search";
export const SearchBar = () => {
  return (
    <div className="relative">
      <div className="absolute right-0">
        <SearchIcon />
      </div>
      <input
        type="search"
        placeholder="Buscar"
        className="w-96 h-12 rounded-3xl border-none px-4 pr-12 font-body text-body-md text-primary-pri2 bg-neutral-neu3 border-2 border-primary-pri2 focus:outline-none placeholder-neutral-neu0"
      />

      <style jsx>{`
        /* Ocultar el icono de borrado en navegadores WebKit (Chrome, Safari) */
        input[type="search"]::-webkit-search-cancel-button {
          -webkit-appearance: none; /* Para Chrome/Safari */
          appearance: none; /* Para otros navegadores */
        }

        /* Ocultar el icono de borrado en Firefox */
        input[type="search"]::-moz-search-cancel-button {
          display: none; /* Para Firefox */
        }
      `}</style>
    </div>
  );
};
