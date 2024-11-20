import { useState } from "react";
import BackIcon from "../../../icons/back";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookDetails } from "../../../hooks/use-book-details";
import { DetailRow } from "../components/detail-row";
import { CircularProgress } from "@mui/material";
import { ReadBook } from "../components/readBook";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { TextLarge } from "../../register/components/text-large";
import { useAudio } from "../../../context/audio-context";
import { IconOclock } from "../icons/oclock";
import { IconDocument } from "../icons/document";

export const BookInfo = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();
  const { bookDetails, error, loading } = useBookDetails(book);
  const [showReadBook, setShowReadBook] = useState(false);
  const { showAudioPlay, setShowAudioPlay } = useAudio();
  const user = JSON.parse(localStorage.getItem("user"));

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
    <div className="flex max-h-screen flex-col bg-primary-pri3">
      <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-8 p-2 z-40">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
      </div>
      <div className="flex flex-col lg:flex-row items-center md:justify-evenly px-5">
        <div className="relative w-full max-w-[80%] aspect-square sm:w-[440px] md:h-[400px] bg-neutral-neu2 rounded-3xl mb-0 md:mb-10">
          <img
            src={book.enlacePortada}
            className="w-full max-w-[85%] sm:w-80 sm:h-[470px] rounded-3xl absolute inset-0 m-auto object-cover"
          />
        </div>
        <div className="mx-5">
          <div className="flex flex-col md:flex-row md:justify-between ">
            <h1 className="max-w-[500px] font-display text-display-sm sm:text-display-lg text-secondary-sec2 mt-10 md:mt-5">
              {book.nombreLibro}
            </h1>
            <div className="flex flex-row space-x-8 mt-4">
              <ButtonIcon
                SvgIcon={ListenIcon}
                variant={`${showAudioPlay ? "combColBlue" : "combColBlack"}`}
                onClick={() => setShowAudioPlay(true)}
              />
              <ButtonIcon
                SvgIcon={ReadIcon}
                variant={`${showReadBook ? "combColBlue" : "combColBlack"}`}
                onClick={() => setShowReadBook(true)}
              />
            </div>
          </div>
          <div className="flex flex-col h-40 justify-around sm:justify-between mt-8">
            <DetailRow label="Autor" value={bookDetails.nombreAutor} />
            <DetailRow label="Idioma" value={bookDetails.idioma} />
            <DetailRow label="Categoría" value={bookDetails.nombreCategoria} />
            <div className="flex gap-4">
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2">
                <IconDocument className="w-5 h-5 mr-2" />
                <p className="text-body-sm font-body">
                  {book.numero_paginas} páginas
                </p>
              </div>
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg gap-2">
                <IconOclock className="w-5 h-5 mr-2" />
                <p className="text-body-sm font-body">
                  {book.duracion_audio} min
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[500px] mt-8 mb-8 sm:my-10">
            <TextLarge text={book.sinopsis} max={250} message="Leer"/>
          </div>
        </div>
      </div>
      {showReadBook && (
        <div>
          <ReadBook
            pdfUrl={book.enlacePdf}
            onClose={() => setShowReadBook(false)}
            id_user={user.id_usuario}
            limited_page={book.numero_paginas}
            codBook={book.codLibro}
          />
        </div>
      )}
    </div>
  );
};
