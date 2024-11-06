import { useEffect, useState } from "react";
import { Carousel } from "../components/carousel";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CircularProgress } from "@mui/material";
import { Footer } from "../../../components/footer/footer";
import { SearchBar } from "../components/search-bar";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { CardBook } from "../components/cardBook";
import { ModalFilter } from "../../books/components/modal-filter";
import { fetchUserBooks } from "../../../services/fetch-user-category";
import { useCompletedBooks } from "../../../hooks/use-get-books-completed";
import { useUserDetails } from "../../../hooks/use-user-details";
import { updateAccom } from "../../../services/update-accomp";
import { updateRacha } from "../../../services/update-streak";
import { NotificationStreak } from "../../users/components/notification-streak";

export const Home = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchBooksOld, setSearchBooksOld] = useState([]);
  const [searchBooksRecent, setSearchBooksRecent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [completedBooks, setCompletedBooks] = useState([]);
  const { userDetails } = useUserDetails(user);
  const [previousRacha, setPreviousRacha] = useState(
    userDetails?.dias_racha || 0
  );
  const [showStreakNotification, setShowStreakNotification] = useState(false);

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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser.id_usuario) {
      fetchUserBooks(storedUser.id_usuario).then((result) =>
        setSelectedPreferences(result)
      );
    }
  }, []);

  useEffect(() => {
    const getCompletedBooks = async () => {
      const books = await useCompletedBooks(user.id_usuario);
      setCompletedBooks(books);
    };
    getCompletedBooks();
  }, []);

  const handleSearchResults = (
    { filterBooks = [], filterBooksRecent = [] },
    text
  ) => {
    if (text) {
      setSelectedCategories([]);
      setSelectedLanguages([]);
    }
    setSearchBooksOld(filterBooks);
    setSearchBooksRecent(filterBooksRecent);
    setSearchText(text);
  };

  useEffect(() => {
    const lastNotificationDate = localStorage.getItem("lastNotificationDate");
    const today = new Date().toISOString().split("T")[0];

    if (userDetails) {
      if (userDetails.minutos_aprendido_hoy >= userDetails.minutos) {
        updateAccom(user.id_usuario, userDetails.id_metrica, true, 0);
      }
      if (userDetails.se_cumplio) {
        let diasRacha = userDetails.dias_racha;
        if (userDetails.se_cumplio) {
          diasRacha += 1;
        }
        if (diasRacha !== previousRacha) {
          setPreviousRacha(diasRacha);
          if (lastNotificationDate !== today) {
            setShowStreakNotification(true);
            localStorage.setItem("lastNotificationDate", today);
          }
        }
        updateRacha(user.id_usuario, userDetails.id_racha, diasRacha);
        updateAccom(user.id_usuario, userDetails.id_metrica, false, 0);
      }
    }
  }, [
    userDetails,
    user.id_usuario,
    user.id_racha,
    user.id_metrica,
    previousRacha,
  ]);

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

  const handleFilterClick = () => {
    setIsModalOpen(!isModalOpen);
    setSearchText("");
    setSearchBooksOld([]);
    setSearchBooksRecent([]);
  };

  const handleApplyFilters = ({ categories, languages }) => {
    setSelectedCategories(categories);
    setSelectedLanguages(languages);
  };
  const bookAll = [...booksOld, ...recentBooks];

  const suggestedBooks = bookAll.filter((book) =>
    selectedPreferences.some(
      (preference) => preference.codCategoria === book.codCategoria
    )
  );

  const filteredBooks = bookAll.filter((book) => {
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

  const noBookFilter =
    (selectedCategories.length > 0 || selectedLanguages.length > 0) &&
    filteredBooks.length === 0;

  const resetNotification = () => {
    setShowStreakNotification(false);
    updateAccom(user.id_usuario, userDetails.id_metrica, false, 0);
  };

  return (
    <div className="flex gri flex-col min-h-screen bg-primary-pri3">
      {showStreakNotification && (
        <NotificationStreak
          day={userDetails.dias_racha + 1}
          isAccom={userDetails.se_cumplio}
          onClose={resetNotification}
        />
      )}
      <div className="flex-grow">
        <div className="sticky top-0 sm:relative w-full py-2 px-6 bg-primary-pri3 sm:pr-12 flex flex-row justify-end items-center space-x-3 mt-2 sm:mt-6  z-40 sm:z-0">
          <SearchBar
            booksOld={booksOld}
            recentBooks={recentBooks}
            onSearchResults={handleSearchResults}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <ButtonIcon
            SvgIcon={FilterIcon}
            variant="combColNeu"
            onClick={handleFilterClick}
          />
        </div>
        {noResults ? (
          <div className="flex justify-center items-center my-32 font-body sm:mt-56 text-body-md sm:text-body-lg text-secondary-sec2 mx-4">
            No se encontraron libros con ese nombre
          </div>
        ) : noBookFilter ? (
          <div className="flex justify-center items-center font-body my-32 sm:mt-56 text-body-md sm:text-body-lg text-secondary-sec2 mx-4">
            No se encontraron libros con esa categoria o idioma
          </div>
        ) : searchText ? (
          <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {[...searchBooksOld, ...searchBooksRecent].map((book) => (
              <CardBook
                key={book.codLibro}
                titleBook={book.nombreLibro}
                frontBook={book.enlacePortada}
                book={book}
              />
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <>
            <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 mt-8">
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
            <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-10 sm:ml-20">
              Sugerencias para ti
            </h1>
            <Carousel books={suggestedBooks} completedBooks={completedBooks} />
            <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-10 sm:ml-20">
              Los más vistos
            </h1>
            <Carousel books={booksOld} completedBooks={completedBooks} />
            <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-10 sm:ml-20">
              Mejor calificados
            </h1>
            <Carousel books={booksOld} completedBooks={completedBooks} />
            <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-10 sm:ml-20">
              Recién agregados
            </h1>
            <Carousel books={recentBooks} completedBooks={completedBooks} />
            <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-10 sm:ml-20">
              Lo más leído esta semana
            </h1>
            <Carousel books={booksOld} completedBooks={completedBooks} />
          </>
        )}
      </div>
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
