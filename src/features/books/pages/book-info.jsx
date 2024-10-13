import React, { useState } from "react";
import { NavbarO } from "../components/navbarO";
import BackIcon from "../../../icons/back";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import ButtonIcon from "../../../components/Buttons/buttonIcon";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookDetails } from "../../../hooks/use-book-details";
import { useFetchNumPages } from "../../../hooks/use-num-pages";
import { DetailRow } from "../components/detail-row";
import { AudioPlayer } from "./audio-player";
import { useAudioDuration } from "../../../hooks/use-audio-duration";
import { CircularProgress } from "@mui/material";

export const BookInfo = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();
  const { bookDetails, error, loading } = useBookDetails(book);
  const { numPages, loadingPdf } = useFetchNumPages(book);
  const audioDuration = useAudioDuration(book.enlaceAudio);
  
  const handleListenClick = () => {
    setShowAudioPlayer(true);
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
      <div className="flex flex-col justify-center items-center min-h-screen">
        <CircularProgress color="success" size={80} />
        <h2 className="mt-4 text-white text-xl">Cargando libro...</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error al obtener detalles del libro: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col ">
      <NavbarO />
      <div className="flex items-center ml-8 p-2 ">
        <ButtonIcon
          SvgIcon={BackIcon}
          variant="combColTrans"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="relative w-[440px] h-[400px] bg-neutral-neu2 rounded-3xl">
          <img
            src={book.enlacePortada}
            className="w-80 h-[520px] rounded-3xl absolute inset-0 m-auto"
          />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-display text-display-lg text-secondary-sec2">
              {book.nombreLibro}
            </h1>
            <div className="flex flex-row space-x-8">
              <button onClick={handleListenClick}>
                <ListenIcon />
              </button>
              <ReadIcon />
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
            <p className="font-body text-body-md text-neutral-neu2">
              {book.sinopsis}
            </p>
          </div>
          {showAudioPlayer && (
            <div className="mt-8">
              <AudioPlayer setShowAudioPlayer={() => setShowAudioPlayer(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
