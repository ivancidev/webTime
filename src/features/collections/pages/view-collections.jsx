import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Footer } from "../../../components/footer/footer";
import { SearchBarCollection } from "../components/search-bar-collection";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { CardBook } from "../components/card-book-delete";
import { ModalFilter } from "../../books/components/modal-filter";
import { useGetUserCollectionBooks } from "../../../hooks/use-get-user-collection-books";
import { useNavigate } from "react-router-dom";

export const ViewCollections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  const idColeccion = localStorage.getItem("collectionId");

  if (!idColeccion) {
    navigate("/profile");
  }

  const {
    data: booksOld = [],
    isLoading: isLoadingOld,
    isError: isErrorOld,
    error: errorOld,
  } = useGetUserCollectionBooks(idColeccion);

  useEffect(() => {
    setFilteredBooks(booksOld); // Inicializar libros filtrados con todos los libros
  }, [booksOld]);

  if (isLoadingOld) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-xl">Cargando colecciones...</h2>
      </div>
    );
  }

  if (isErrorOld) return <div>Error: {errorOld.message}</div>;

  const noResults = searchText && filteredBooks.length === 0;

  const handleFilterClick = () => {
    setIsModalOpen(!isModalOpen);
    setSearchText("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-pri3">
      <div className="flex-grow">
        {/* Cabecera: Título y Barra de Búsqueda */}
        <div className="sticky top-0 sm:relative w-full py-2 px-6 bg-primary-pri3 sm:pr-12 flex flex-wrap sm:flex-row justify-between items-center mt-2 sm:mt-6 z-40">
          <h1 className="text-secondary-sec2 font-title text-title-md sm:text-lg">
            Mi Colección
          </h1>
          <div className="flex items-center space-x-3">
            <SearchBarCollection
              booksOld={booksOld}
              onSearchResults={(results) => setFilteredBooks(results)}
              searchText={searchText}
              setSearchText={setSearchText}
              placeholder="Buscar en esta colección"
            />
            <ButtonIcon
              SvgIcon={FilterIcon}
              variant="combColNeu"
              onClick={handleFilterClick}
            />
          </div>
        </div>
        {/* Mostrar Libros */}
        {noResults ? (
          <div className="flex justify-center items-center my-32 font-body sm:mt-56 text-body-md sm:text-body-lg text-secondary-sec2 mx-4">
            No se encontraron libros con ese título o autor
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredBooks.map((book) => (
              <CardBook
                key={book.codLibro}
                titleBook={book.nombreLibro}
                frontBook={book.enlacePortada}
                authorBook={book.autor.nombreAutor}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ModalFilter
          onClose={handleFilterClick}
          onApplyFilters={(filters) => {
            const { categories, languages } = filters;
            const filtered = booksOld.filter((book) => {
              const matchesCategory =
                categories.length === 0 ||
                categories.includes(book.categoria.nombreCategoria);
              const matchesLanguage =
                languages.length === 0 ||
                languages.includes(book.idioma.idioma);
              return matchesCategory && matchesLanguage;
            });
            setFilteredBooks(filtered);
          }}
          selectedCategories={[]}
          selectedLanguages={[]}
        />
      )}
      <Footer />
    </div>
  );
};
