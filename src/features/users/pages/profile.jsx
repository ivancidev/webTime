import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { NavbarO } from "../../../components/navbar/navbarO";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CardBook } from "../../books/components/cardBook";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";

export const Profile = () => {
    const navigate = useNavigate();
    const [visibleRows, setVisibleRows] = useState(2); // Mostrar 2 filas inicialmente
    
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
    const booksToShow = bookAll.slice(0, visibleRows*2); // Muestra 2 libros por cada fila visible
    const handleShowMore = () => {
        setVisibleRows(visibleRows + 2); // Incrementa en 2 filas cada vez que se hace clic en "Ver más"
    };

    return (
        <div>
            <NavbarO />
            <div className="">
                <div className="ml-6 md:ml-8 lg:ml-14 md:mt-8">
                    <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/app")} />
                </div>
                <div className="flex justify-center items-center  
                    lg:space-x-64 flex-col md:flex-row space-x-4 mt-5 lg:mt-0">
                    <div>
                        <PerfilUser nombre_completo="nombre_completo"
                                    nickname="nickname"
                                    correoelectronico="correoelectronico@gmail.com" />
                    </div>
                    <div className="mt-5 md:mt-0">
                        <DailyStreak days="11" />
                    </div>
                    </div>
                <div className="mt-5 md:mt-10 ">
                    <CompletedBooksSection completedBooksCount="12" />
                </div>
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
                {visibleRows * 2 < bookAll.length && (
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
