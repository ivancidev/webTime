// src/features/collections/pages/view-collections.jsx
import React, { useEffect, useState } from "react";
import { Carousel } from "../../books/components/carousel"; 
import { useGetBooks } from "../../../hooks/use-get-books";
import { CircularProgress } from "@mui/material"; 
import { Footer } from "../../../components/footer/footer";
import { SearchBar } from "../../books/components/search-bar";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { CardBook } from "../components/card-book-delete";
import { ModalFilter } from "../../books/components/modal-filter"; 
import { fetchUserBooks } from "../../../services/fetch-user-category";
import { useCompletedBooks } from "../../../hooks/use-get-books-completed";

export const ViewCollections = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
  
    const {
      data: booksOld = [],
      isLoading: isLoadingOld,
      isError: isErrorOld,
      error: errorOld,
    } = useGetBooks(false);
  
    useEffect(() => {
      // Carga inicial si necesitas realizar alguna operación adicional
    }, []);
  
    if (isLoadingOld) {
      return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
          <CircularProgress color="primary" size={100} />
          <h2 className="mt-4 text-xl">Cargando colecciones...</h2>
        </div>
      );
    }
  
    if (isErrorOld) return <div>Error: {errorOld.message}</div>;
  
    const noResults = searchText && booksOld.length === 0;
  
    const handleFilterClick = () => {
      setIsModalOpen(!isModalOpen);
      setSearchText("");
    };
  
    return (
      <div className="flex flex-col min-h-screen bg-primary-pri3">
        <div className="flex-grow">
          <div className="sticky top-0 sm:relative w-full py-2 px-6 bg-primary-pri3 sm:pr-12 flex flex-row justify-end items-center space-x-3 mt-2 sm:mt-6 z-40 sm:z-0">
            <SearchBar
              booksOld={booksOld}
              onSearchResults={(results, text) => setSearchText(text)}
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Buscar por título o autor"
              existsA={true}
            />
            <ButtonIcon
              SvgIcon={FilterIcon}
              variant="combColNeu"
              onClick={handleFilterClick}
            />
          </div>
          {noResults ? (
            <div className="flex justify-center items-center my-32 font-body sm:mt-56 text-body-md sm:text-body-lg text-secondary-sec2 mx-4">
              No se encontraron colecciones con ese título o autor
            </div>
          ) : (
            <>
              {/* Mostrar los libros en una cuadrícula de 4 columnas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {booksOld.map((book) => (
                  <CardBook
                    key={book.codLibro}
                    titleBook={book.nombreLibro}
                    frontBook={book.enlacePortada}
                    authorBook={book.autor.nombreAutor}
                    book={book}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {isModalOpen && (
          <ModalFilter
            onClose={handleFilterClick}
            onApplyFilters={() => {}}
            selectedCategories={[]}
            selectedLanguages={[]}
          />
        )}
        <Footer />
      </div>
    );
  };
  