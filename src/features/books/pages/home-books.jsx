import React, { useState } from "react";
import { Carousel } from "../components/carousel";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CircularProgress } from "@mui/material";
import { useGetRecentBooks } from "../../../hooks/use-recent-book";
import { Footer } from "../../../components/footer/footer";
import { SearchBar } from "../../users/components/search-bar";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { ModalFilter } from "../../books/components/modal-filter";
import { CardBook } from "../components/cardBook";

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const {
    data: books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
    error: errorBooks,
  } = useGetBooks();
  const {
    data: recentBooks,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    error: errorRecent,
  } = useGetRecentBooks();

  if (isLoadingBooks || isLoadingRecent) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-xl">Cargando libros...</h2>
      </div>
    );
  }
  if (isErrorBooks) return <div>Error: {errorBooks.message}</div>;
  if (isErrorRecent) return <div>Error: {errorRecent.message}</div>;

  const handleFilterClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleApplyFilters = ({ categories, languages }) => {
    setSelectedCategories(categories);
    setSelectedLanguages(languages);
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(book.categoria.nombreCategoria);

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(book.idioma.idioma);

    if (selectedCategories.length > 0 && selectedLanguages.length > 0) {
      return matchesCategory && matchesLanguage;
    } else if (selectedCategories.length > 0) {
      return matchesCategory;
    } else if (selectedLanguages.length > 0) {
      return matchesLanguage;
    } else {
      return false;
    }
  });

  return (
    <div className="bg-primary-pri3">
      <div className="w-full pr-12 flex flex-row justify-end items-center space-x-3 mt-6">
        <SearchBar />
        <ButtonIcon
          SvgIcon={FilterIcon}
          variant="combColNeu"
          onClick={handleFilterClick}
        />
      </div>

      {filteredBooks.length > 0 ? (
        <>
          <div className="grid place-items-center grid-cols-4 gap-4 px-6 mt-8">
            {filteredBooks.map((filterBook, index) => (
              <CardBook
                key={index}
                titleBook={filterBook.nombreLibro}
                frontBook={filterBook.enlacePortada}
                book={filterBook}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
            Los más vistos
          </h1>
          <Carousel books={books} />

          <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
            Mejor calificados
          </h1>
          <Carousel books={books} />

          <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
            Recién agregados
          </h1>
          <Carousel books={recentBooks} />

          <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
            Lo más leído esta semana
          </h1>
          <Carousel books={books} />
        </>
      )}

      {isModalOpen && (
        <ModalFilter
          onClose={handleFilterClick}
          onApplyFilters={handleApplyFilters}
          selectedCategories={selectedCategories}
          selectedLanguages={selectedLanguages}
        />
      )}
      <Footer />
    </div>
  );
};
