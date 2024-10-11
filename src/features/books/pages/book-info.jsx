import React, { useState } from "react";
import { NavbarO } from "../components/navbarO";
import BackIcon from "../../../icons/back";
import { Link } from "react-router-dom";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import { AudioPlayer } from "./audiobook-player";

export const BookInfo = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const frontBook = "/src/assets/icons/logo.svg";
  const titleBook = "HTML y CSS";
  const autorBook = "Anonimo";
  const categBook = "Fronted";
  const lenguageBook = "Español";
  const numPages = "3";
  const duration = "5" + " min";
  const synopsis =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsa. Labore eveniet sint quidem reprehenderit, id distinctio laudantium similique dolores ex. Sapiente minima quam aliquid molestias a iusto sequi officiis.";
  const handleListenClick = () => {
    setShowAudioPlayer(true);
  };
  return (
    <div className="flex min-h-screen flex-col ">
      <NavbarO />
      <div className="flex items-center ml-8 p-2 ">
        <Link to="/">
          <BackIcon className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="relative w-[440px] h-[400px] bg-neutral-neu2 rounded-3xl">
          <img
            src={frontBook}
            className=" w-72 h-[520px] rounded-3xl absolute inset-0 m-auto object-cover"
          />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-display text-display-lg text-secondary-sec2">
              {titleBook}
            </h1>
            <div className="flex flex-row space-x-8">
              <button onClick={handleListenClick}>
                <ListenIcon />
              </button>
              <ReadIcon />
            </div>
          </div>

          <div className="flex flex-col h-40 justify-between mt-8">
            <div className="text-neutral-neu2 flex space-x-2">
              <h3 className="font-label text-label-lg">Autor: </h3>
              <h2 className="font-body text-body-lg mt-[2px]">{autorBook}</h2>
            </div>
            <div className="text-neutral-neu2 flex space-x-2">
              <h3 className="font-label text-label-lg">Idioma: </h3>
              <h2 className="font-body text-body-lg mt-[2px]">
                {lenguageBook}
              </h2>
            </div>
            <div className="text-neutral-neu2 flex space-x-2">
              <h3 className="font-label text-label-lg">Categoria: </h3>
              <h2 className="font-body text-body-lg mt-[2px]">{categBook}</h2>
            </div>
            <div className="text-neutral-neu2 flex space-x-2 ">
              <h3 className="font-label text-label-lg">Número de páginas: </h3>
              <h2 className="font-body text-body-lg mt-[2px]">{numPages}</h2>
            </div>
            <div className="text-neutral-neu2 flex space-x-2">
              <h3 className="font-label text-label-lg">Duración del audio:</h3>
              <h2 className="font-body text-body-lg mt-[2px]">{duration}</h2>
            </div>
          </div>
          <div className="w-[500px] mt-8">
            <p className="font-body text-body-md text-neutral-neu2">
              {synopsis}
            </p>
          </div>
          {showAudioPlayer && (
            <div className="mt-8">
              <AudioPlayer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};