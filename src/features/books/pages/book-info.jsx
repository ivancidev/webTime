import React, { useState } from "react";
import { NavbarO } from "../components/navbarO";
import BackIcon from "../../../icons/back";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookDetails } from "../../../hooks/use-book-details";
import { useFetchNumPages } from "../../../hooks/use-num-pages";
import { DetailRow } from "../components/detail-row";
import { AudioPlayer } from "./audio-player";
import { useAudioDuration } from "../../../hooks/use-audio-duration";
import { CircularProgress } from "@mui/material";
import { ReadBook } from "../components/readBook";
import CloseIcon from "../../../icons/close";

export const BookInfo = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();
  const { bookDetails, error, loading } = useBookDetails(book);
  const { numPages, loadingPdf } = useFetchNumPages(book);
  const audioDuration = useAudioDuration(book.enlaceAudio);
  const [showReadBook, setShowReadBook] = useState(false);
  
  const handleReadClick = () => {
    setShowReadBook(true);
  };

  if (!book) {
    return (
      <div className="text-neutral-50">
        ¡No se encontraron detalles del libro!
      </div>
    );
  }

  if (loading || loadingPdf || audioDuration === null) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="success" size={80} />
        <h2 className="mt-4 text-white text-xl">Cargando libro...</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error al obtener detalles del libro: {error.message}</div>;
  }

  const handleCloseReadBook = () => {
    setShowReadBook(false);
  };
  const pdfBook = "/src/assets/pdfs/CAP1_IA.pdf";
  return (
    <div className="flex min-h-screen flex-col bg-primary-pri3">
      <NavbarO />

      <div className="flex items-center ml-8 p-2 ">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/")} />
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="relative w-[440px] h-[400px] bg-neutral-neu2 rounded-3xl">
          <img
            src={book.enlacePortada}
            className="w-80 h-[470px] rounded-3xl absolute inset-0 m-auto object-cover"
          />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-display text-display-lg text-secondary-sec2">
              {book.nombreLibro}
            </h1>
            <div className="flex flex-row space-x-8">
              <ButtonIcon
                SvgIcon={ListenIcon}
                variant="combColBlack"
                onClick={() => setShowAudioPlayer(true)}
              />
              <ButtonIcon
                SvgIcon={ReadIcon}
                variant="combColBlack"
                onClick={handleReadClick}
              />
            </div>
          </div>

          <div className="flex flex-col h-40 justify-between mt-8">
            <DetailRow label="Autor" value={bookDetails.nombreAutor} />
            <DetailRow label="Idioma" value={bookDetails.idioma} />
            <DetailRow label="Categoría" value={bookDetails.nombreCategoria} />
            <DetailRow label="Número de páginas" value={numPages} />
            <DetailRow
              label="Duración del audio"
              value={`${
                audioDuration !== null
                  ? audioDuration.toFixed(2)
                  : "Cargando..."
              } min`}
            />
          </div>
          <div className="w-[500px] mt-8">
            <p className="font-body text-body-md text-neutral-neu0">
              {book.sinopsis}
            </p>
          </div>
          {showAudioPlayer && (
            <div className="mt-8">
              <AudioPlayer
                setShowAudioPlayer={() => setShowAudioPlayer(false)}
                urlAudio={book.enlaceAudio}
              />
            </div>
          )}
        </div>
      </div>
      {showReadBook && (
        <div>
          <ReadBook pdfUrl={pdfBook} onClose={handleCloseReadBook} />
        </div>
      )}
    </div>
  );
};
