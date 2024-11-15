import React, { useState } from "react";
import { SearchBar } from "../../books/components/search-bar";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Button from "../../../components/buttons/button";
import CloseIcon from "../../../icons/close";
import AddIcon from "../../../icons/add";
import { CardBookCol } from "./card-book-col";
import { CircularProgress } from "@mui/material";
import { useGetBooks } from "../../../hooks/use-get-books";
export const ModalBooks = ({ onClose }) => {
  const [searchBooksOld, setSearchBooksOld] = useState([]);
  const [searchBooksRecent, setSearchBooksRecent] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const bookAll = [...booksOld, ...recentBooks];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[660px] h-[530px] bg-primary-pri3 rounded-2xl p-6">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        <div className="px-6 pb-4">
          <div>
            <SearchBar
              booksOld={booksOld}
              recentBooks={recentBooks}
              onSearchResults={handleSearchResults}
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Buscar por título"
              smWidth="sm:w-80"
              existsA={false}
            />
          </div>

          {noResults ? (
            <div
              className="flex justify-center mt-4 items-center font-body text-body-sm  text-secondary-sec2 mx-4"
              style={{ height: "300px" }}
            >
              No se encontraron libros con ese título
            </div>
          ) : searchText ? (
            <div
              className="flex flex-wrap mt-4 overflow-y-auto"
              style={{ height: "300px" }}
            >
              {[...searchBooksOld, ...searchBooksRecent].map((book) => (
                <div className="w-1/3 flex justify-center p-2">
                  <CardBookCol
                    key={book.codLibro}
                    titleBook={book.nombreLibro}
                    frontBook={book.enlacePortada}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-wrap mt-4 overflow-y-auto"
              style={{ height: "300px" }}
            >
              {bookAll.map((book, index) => (
                <div className="w-1/3 flex justify-center p-2">
                  <CardBookCol
                    key={index}
                    frontBook={book.enlacePortada}
                    titleBook={book.nombreLibro}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-end space-x-4 my-2 mr-3">
          <Button text="Añadir" SvgIcon={AddIcon} />
        </div>
      </div>
    </div>
  );
};
