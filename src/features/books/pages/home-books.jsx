import { useState } from "react";
import { Carousel } from "../components/carousel";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CircularProgress } from "@mui/material";
import { Footer } from "../../../components/footer/footer";
import { SearchBar } from "../components/search-bar";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";

export const Home = () => {
  const {
    data: booksOld = [],
    isLoading: isLoadingOld,
    isError: isErrorOld,
    error: errorOld,
  } = useGetBooks(false);
  const {
    data: recentBooks = [],
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    error: errorRecent,
  } = useGetBooks(true);

  const [searchBooksOld, setSearchBooksOld] = useState([]);
  const [searchBooksRecent, setSearchBooksRecent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchResults = (
    { filterBooks = [], filterBooksRecent = [] },
    text
  ) => {
    setSearchBooksOld(filterBooks);
    setSearchBooksRecent(filterBooksRecent);
    setSearchText(text);
  };

  if (isLoadingOld || isLoadingRecent) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-xl">Cargando libros...</h2>
      </div>
    );
  }
  if (isErrorOld) return <div>Error: {errorOld.message}</div>;
  if (isErrorRecent) return <div>Error: {errorRecent.message}</div>;

  const noResults =
    searchText && searchBooksOld.length === 0 && searchBooksRecent.length === 0;

  return (
    <div className="flex gri flex-col min-h-screen bg-primary-pri3">
      <div className="flex-grow">
        <div className="w-full pr-12 flex flex-row justify-end items-center space-x-3 mt-6">
          <SearchBar
            booksOld={booksOld}
            recentBooks={recentBooks}
            onSearchResults={handleSearchResults}
          />
          <ButtonIcon SvgIcon={FilterIcon} variant="combColNeu" />
        </div>

        {noResults ? (
          <div className="flex justify-center items-center mt-56 text-xl text-secondary-sec2">
            No se encontraron libros con ese nombre
          </div>
        ) : (
          <>
            {searchBooksOld.length > 0 && (
              <>
                <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
                  Los más vistos
                </h1>
                <Carousel books={searchBooksOld} />
              </>
            )}
            {searchBooksOld.length > 0 && (
              <>
                <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
                  Mejor calificados
                </h1>
                <Carousel books={searchBooksOld} />
              </>
            )}

            {searchBooksRecent.length > 0 && (
              <>
                <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
                  Recién agregados
                </h1>
                <Carousel books={searchBooksRecent} />
              </>
            )}

            {searchBooksOld.length > 0 && (
              <>
                <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
                  Lo más leído esta semana
                </h1>
                <Carousel books={searchBooksOld} />
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
