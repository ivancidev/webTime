import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { useEffect, useState } from "react";
import { ModalFilter } from "../../books/components/modal-filter";
import CalendarIcon from "../../../icons/calendar";
import { Calendar } from "./calendar";
import { useNavigate } from "react-router-dom";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CardBook } from "../../books/components/cardBook";

const CompletedBooksSection = ({ completedBooksCount}) => {

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

    const handleFilterClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleApplyFilters = ({ categories, languages }) => {
        setSelectedCategories(categories);
        setSelectedLanguages(languages);
    };

    const navigate = useNavigate();
    const [visibleRows, setVisibleRows] = useState(2);
    const [columns, setColumns] = useState(2);
    const [isOpenCompleted, setIsOpenCompleted] = useState(false);

    const bookCompleted = () => {
        setIsOpenCompleted(!isOpenCompleted);
    };
    
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
    
    const booksToShow = bookAll.slice(0, visibleRows * columns);

    const handleShowMore = () => {
        setVisibleRows(visibleRows + 2);
    };

    return (
        <div clasName="flex flex-col w-full">
              <div className="flex flex-col ml-[90px] md:ml-[150px] items-center w-fit mb-2">
                    <button className={`${isOpenCompleted ? varCol.comb2 : varCol.comb1} rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center`} onClick={bookCompleted}>
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
              <div className="flex justify-end w-full md:pr-20 pr-10 mt-3">
                    <ButtonIcon
                        SvgIcon={FilterIcon} 
                        variant={`${isModalOpen ? "combColBlue" : "combColBlack2"}`}
                        onClick={handleFilterClick}
                    />
                    <ButtonIcon
                          SvgIcon={CalendarIcon}
                          variant= {`${isCalendarOpen ? "combColBlue" : "combColBlack2"}`}
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
            {isCalendarOpen && <Calendar onClose={toggleCalendar} />}
            {isOpenCompleted && (
                    <>
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
                        {visibleRows * columns < bookAll.length && (
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
