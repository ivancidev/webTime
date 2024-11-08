import { useEffect } from "react";
import SearchIcon from "../../../icons/search";
import Close from "../../../icons/closeS";
import ButtonIcon from "../../../components/buttons/buttonIcon";
export const SearchBar = ({
  booksOld,
  recentBooks,
  onSearchResults,
  searchText,
  setSearchText,
}) => {
  useEffect(() => {
    const trimmedSearchText = searchText.trim();

    if (trimmedSearchText === "") {
      onSearchResults({ filterBooks: [], filterBooksRecent: [] }, searchText);
      return;
    }

    const filterBooks = booksOld.filter(
      (book) =>
        book.nombreLibro
          .toLowerCase()
          .includes(trimmedSearchText.toLowerCase()) ||
        book.autor.nombreAutor
          .toLowerCase()
          .includes(trimmedSearchText.toLowerCase())
    );

    const filterBooksRecent = recentBooks.filter(
      (book) =>
        book.nombreLibro
          .toLowerCase()
          .includes(trimmedSearchText.toLowerCase()) ||
        book.autor.nombreAutor
          .toLowerCase()
          .includes(trimmedSearchText.toLowerCase())
    );

    onSearchResults({ filterBooks, filterBooksRecent }, searchText);
  }, [searchText]);

  return (
    <div className="relative w-full sm:w-auto">
      <div className="absolute left-0">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Buscar por título o autor"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full sm:w-96 h-12 rounded-3xl border-none px-4 pl-12 font-body text-body-md text-primary-pri2 bg-neutral-neu3 border-2 border-primary-pri2 focus:outline-none placeholder-neutral-neu0"
      />
      {searchText && (
        <div className="absolute right-1 top-1 items-center">
          <ButtonIcon
            onClick={() => setSearchText("")}
            SvgIcon={Close}
            variant="combColNeu2"
          />
        </div>
      )}
    </div>
  );
};
