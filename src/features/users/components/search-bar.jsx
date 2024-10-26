import React, { useState } from "react";
import SearchIcon from "../../../icons/search";
import Close from "../../../icons/closeS";
import ButtonIcon from "../../../components/buttons/buttonIcon";
export const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
  };
  return (
    <div className="relative">
      <div className="absolute left-0">
        <SearchIcon />
      </div>
      <input
        type="search"
        placeholder="Buscar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-96 h-12 rounded-3xl border-none px-4 pl-12 font-body text-body-md text-primary-pri2 bg-neutral-neu3 border-2 border-primary-pri2 focus:outline-none placeholder-neutral-neu0"
      />
      {searchText && (
        <div className="absolute right-1 top-1">
          <ButtonIcon
            onClick={handleClear}
            SvgIcon={Close}
            variant="combColTrans2"
          />
        </div>
      )}
    </div>
  );
};
