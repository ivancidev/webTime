import React, { useEffect, useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import CalendarIcon from "../../../icons/calendar";
import { Calendar } from "./calendar";
import { useNavigate } from "react-router-dom";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CardBook } from "../../books/components/cardBook";
import { ModalFilter } from "../../books/components/modal-filter";

const CompletedBooksSection = ({ completedBooksCount }) => {
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const toggleCalendar = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    const varCol = {
        comb1: "text-primary-pri2 hover:text-secondary-sec2",
        comb2: "text-secondary-sec2 hover:text-secondary-sec1",
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [visibleRows, setVisibleRows] = useState(2);
    const [columns, setColumns] = useState(2);
    const [isOpenCompleted, setIsOpenCompleted] = useState(false);

    const handleFilterClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleApplyFilters = ({ categories, languages }) => {
        setSelectedCategories(categories);
        setSelectedLanguages(languages);
    };

    const navigate = useNavigate();

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

    const bookAll = [...booksOld, ...recentBooks];

    const filteredBooks = bookAll.filter((book) => {
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(book.categoria.nombreCategoria);

        const matchesLanguage =
            selectedLanguages.length === 0 ||
            selectedLanguages.includes(book.idioma.idioma);

        return matchesCategory && matchesLanguage;
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
                <button
                    className={`${isOpenCompleted ? varCol.comb2 : varCol.comb1} rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center`}
                    onClick={() => setIsOpenCompleted(!isOpenCompleted)}
                >
                    <span className="text-title-md font-title">
                        {completedBooksCount}
                    </span>
                    <span className="text-body-md font-body">Concluidos</span>
                </button>
            </div>
            <div className="flex flex-row items-center mx-8 md:mx-14">
                <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
                <div className="flex-grow border-t border-neutral-neu1"></div>
                <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
            </div>
            {isOpenCompleted && (
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
            )}
            {isModalOpen && (
                <ModalFilter
                    onClose={handleFilterClick}
                    onApplyFilters={handleApplyFilters}
                    selectedCategories={selectedCategories}
                    selectedLanguages={selectedLanguages}
                />
            )}
            {isCalendarOpen && <Calendar onClose={toggleCalendar} />}
            {isOpenCompleted && (
            <>
                {filteredBooks.length === 0 ? (
                    <div className="flex justify-center items-center my-32 font-body text-body-md text-secondary-sec2 mx-4">
                        No se encontraron libros concluidos que coincidan con los criterios seleccionados.
                    </div>
                ) : (
                    <div className="grid place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {booksToShow.map((book, index) => (
                            <CardBook
                                key={index}
                                titleBook={book.nombreLibro}
                                frontBook={book.enlacePortada}
                                book={book}
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
            </>
        )}
        </div>
    );
};

export default CompletedBooksSection;
