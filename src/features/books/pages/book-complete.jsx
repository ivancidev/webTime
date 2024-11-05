import BackIcon from "../../../icons/back";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookDetails } from "../../../hooks/use-book-details";
import { DetailRow } from "../components/detail-row";
import { CircularProgress } from "@mui/material";
import { TextLarge } from "../../register/components/text-large";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const BookComplete = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();
  const { bookDetails, error, loading } = useBookDetails(book);

  if (!book) {
    return (
      <div className="text-neutral-50">
        ¡No se encontraron detalles del libro!
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={80} />
        <h2 className="mt-4 text-xl">Cargando libro...</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error al obtener detalles del libro: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary-pri3">
      <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-8 p-2 z-40">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/profile")} />{" "}
      </div>
      <div className="flex flex-col lg:flex-row items-center md:justify-evenly px-5">
        <div className="relative w-full max-w-[80%] aspect-square sm:w-[440px] md:h-[400px] bg-neutral-neu2 rounded-3xl mb-0 md:mb-10">
          <img
            src={book.enlacePortada}
            className="w-full max-w-[80%] sm:w-80 sm:h-[470px] rounded-3xl absolute inset-0 m-auto object-cover"
          />
        </div>
        <div className="mx-5">
          <div className="flex flex-col md:flex-row md:justify-between ">
            <h1 className="max-w-[500px] font-display text-display-sm sm:text-display-lg text-secondary-sec2 mt-10 md:mt-5">
              {book.nombreLibro}
            </h1>
          </div>
          <div className="flex flex-col h-40 justify-around sm:justify-between mt-8">
            <DetailRow label="Autor" value={bookDetails.nombreAutor} />
            <DetailRow label="Idioma" value={bookDetails.idioma} />
            <DetailRow label="Categoría" value={bookDetails.nombreCategoria} />
            <DetailRow label="Número de páginas" value={book.numero_paginas} />
            <DetailRow
              label="Duración del audio"
              value={`${book.duracion_audio} min`}
            />
          </div>
          <div className="max-w-[500px] mt-4 mb-8 sm:my-10">
            <TextLarge sinopsis={book.sinopsis} />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-white">
        <h2 className="text-lg font-bold">¡Libro terminado!</h2>
        <p className="text-md">
          Has completado la lectura/escucha de este libro.
        </p>
      </div>
    </div>
  );
};
