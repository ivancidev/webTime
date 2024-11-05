import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import CalendarIcon from "../../../icons/calendar";
import { Calendar } from "./calendar";
import { CardBook } from "../../books/components/cardBook";
import { ModalFilter } from "../../books/components/modal-filter";
import { useCompletedBooks } from "../../../hooks/use-get-books-completed";
import dayjs from "dayjs";

const CompletedBooksSection = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [columns, setColumns] = useState(2);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getCompletedBooks = async () => {
      const books = await useCompletedBooks(user.id_usuario);
      setCompletedBooks(books);
    };

    getCompletedBooks();
  }, []);

  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleFilterClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleApplyFilters = ({ categories, languages }) => {
    setSelectedCategories(categories);
    setSelectedLanguages(languages);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
    setCalendarOpen(false);
  };

  const filteredBooks = completedBooks.filter((book) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(book.libro.categoria.nombreCategoria);

    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(book.libro.idioma.idioma);

    const matchesDate =
      !selectedDate ||
      dayjs(book.fecha_conclusion).format("YYYY-MM-DD") === selectedDate;

    return matchesCategory && matchesLanguage && matchesDate;
  });

  const booksToShow = filteredBooks.slice(0, visibleRows * columns);

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 2);
  };

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumns(4);
      else if (width >= 768) setColumns(3);
      else setColumns(2);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col ml-[90px] md:ml-[150px] items-center w-fit mb-2">
        <span className="text-title-lg font-title text-secondary-sec2">
          {completedBooks?.length}
        </span>
        <span className="text-body-md font-body">Concluidos</span>
      </div>
      <div className="flex flex-row items-center mx-8 md:mx-14">
        <div className="w-2 h-2 bg-secondary-sec2 rounded-full"></div>
        <div className="flex-grow border-t border-secondary-sec2"></div>
        <div className="w-2 h-2 bg-secondary-sec2 rounded-full"></div>
      </div>
      <div className="flex justify-end w-full md:pr-20 pr-10 mt-3">
        <ButtonIcon
          SvgIcon={FilterIcon}
          variant={`${isModalOpen ? "combColBlue" : "combColBlack2"}`}
          onClick={handleFilterClick}
        />
        <ButtonIcon
          SvgIcon={CalendarIcon}
          variant={`${isCalendarOpen ? "combColBlue" : "combColBlack2"}`}
          onClick={toggleCalendar}
        />
      </div>
      {isModalOpen && (
        <ModalFilter
          onClose={handleFilterClick}
          onApplyFilters={handleApplyFilters}
          selectedCategories={selectedCategories}
          selectedLanguages={selectedLanguages}
        />
      )}
      {isCalendarOpen && (
        <Calendar onClose={toggleCalendar} onSelectDate={handleDateSelect} />
      )}
      <div className="flex flex-col p-4">
        {filteredBooks.length === 0 ? (
          selectedDate ? (
            <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
              No se encontraron libros concluidos para la fecha seleccionada
            </div>
          ) : (
            <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
              ¡Aún no has terminado ningún libro, sigue leyendo!
            </div>
          )
        ) : (
          <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {booksToShow.map((book) => (
              <CardBook
                key={book.libro.codLibro}
                titleBook={book.libro.nombreLibro}
                frontBook={book.libro.enlacePortada}
                book={book.libro}
              />
            ))}
          </div>
        )}
        {visibleRows * columns < filteredBooks.length && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="text-secondary-sec2 font-body text-body-md hover:underline m-5 text-justify"
            >
              Ver más...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedBooksSection;
