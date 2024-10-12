import React from "react";
import { NavbarO } from "../components/navbarO";
import BackIcon from "../../../icons/back";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const BookInfo = () => {
  const frontBook = "/src/assets/icons/logo.svg";
  const titleBook = "HTML y CSS";
  const autorBook = "Anonimo";
  const categBook = "Fronted";
  const lenguageBook = "Español";
  const numPages = "3";
  const duration = "5" + " min";
  const synopsis = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsa. Labore eveniet sint quidem reprehenderit, id distinctio laudantium similique dolores ex. Sapiente minima quam aliquid molestias a iusto sequi officiis.";

  return (
    <div className="flex min-h-screen flex-col ">
      <NavbarO />
      <div className="w-full h-[60px]">
        <div className="fixed top-70 flex items-center bg-black bg-opacity-75 rounded-3xl ml-2 sm:ml-8 p-2 z-50">
          <ButtonIcon SvgIcon={BackIcon} variant="combColTrans" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center md:justify-evenly px-5">
        <div className="relative w-full max-w-[80%] aspect-square md:w-[440px] md:h-[400px] bg-neutral-neu2 rounded-3xl">
          <img
            src={frontBook}
            className=" w-72 h-[520px] rounded-3xl absolute inset-0 m-auto object-cover"
          />
        </div>
        <div className="mx-5">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <h1 className="font-display text-display-sm sm:text-display-lg text-secondary-sec2 mt-10 md:mt-5">
              {titleBook}
            </h1>
            <div className="flex flex-row space-x-8 mt-4">
              <ButtonIcon SvgIcon={ListenIcon} variant="combColTrans2" />
              <ButtonIcon SvgIcon={ReadIcon} variant="combColTrans2" />
            </div>
          </div>

          <div className="flex flex-col h-40 justify-between mt-8 px-4 md:px-0">
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
          <div className="max-w-[500px] my-8 px-4 md:px-0">
            <p className="font-body text-body-md text-neutral-neu2">
              {synopsis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
