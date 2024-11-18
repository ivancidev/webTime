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
  const [booksSelected, setBooksSelected] = useState([]);
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

  const toggleBookSelect = (book) => {
    setBooksSelected((prevSelected) => {
      if (
        prevSelected.some(
          (selectedBook) => selectedBook.codLibro === book.codLibro
        )
      ) {
        return prevSelected.filter(
          (selectedBook) => selectedBook.codLibro !== book.codLibro
        );
      } else {
        return [...prevSelected, book];
      }
    });
  };

  const handleAddBooks = () => {
    onClose(booksSelected);
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

  const bookAll = [...booksOld, ...recentBooks].sort((a, b) =>
    a.nombreLibro.localeCompare(b.nombreLibro)
  );

  const isCardSelects = booksSelected.length > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[660px] h-[530px] bg-primary-pri3 rounded-2xl p-6">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={() => onClose([])}
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
              placeholder="Buscar libro"
              smWidth="sm:w-80"
              existsA={false}
            />
          </div>

          {noResults ? (
            <div
              className="flex justify-center mt-4 items-center font-body text-body-md  text-secondary-sec2 mx-4"
              style={{ height: "300px" }}
            >
              No hay resultados para la búsqueda
            </div>
          ) : searchText ? (
            <div
              className="flex flex-wrap mt-4 overflow-y-auto"
              style={{ height: "300px" }}
            >
              {[...searchBooksOld, ...searchBooksRecent].map((book) => (
                <div
                  className="w-1/3 flex justify-center p-2"
                  key={book.codLibro}
                >
                  <CardBookCol
                    titleBook={book.nombreLibro}
                    frontBook={book.enlacePortada}
                    isSelect={booksSelected.some(
                      (selectedBook) => selectedBook.codLibro === book.codLibro
                    )}
                    toggleSelect={() => toggleBookSelect(book)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex flex-wrap mt-4 overflow-y-auto"
              style={{ height: "300px" }}
            >
              {bookAll.map((book) => (
                <div
                  className="w-1/3 flex justify-center p-2"
                  key={book.codLibro}
                >
                  <CardBookCol
                    frontBook={book.enlacePortada}
                    titleBook={book.nombreLibro}
                    isSelect={booksSelected.some(
                      (selectedBook) => selectedBook.codLibro === book.codLibro
                    )}
                    toggleSelect={() => toggleBookSelect(book)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-end space-x-4 my-2 mr-3">
          <Button
            text="Añadir"
            SvgIcon={AddIcon}
            onClick={handleAddBooks}
            variant={isCardSelects ? "combCol1" : "combDesactivate"}
            disabled={!isCardSelects}
          />
        </div>
      </div>
    </div>
  );
};
