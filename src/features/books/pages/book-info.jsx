import React from "react";
import { NavbarO } from "../components/navbarO";
import BackIcon from "../../../icons/back";
import { Link } from "react-router-dom";
import ListenIcon from "../../../icons/listen";
import ReadIcon from "../../../icons/read";

export const BookInfo = () => {
  return (
    <div className="flex min-h-screen flex-col ">
      <NavbarO />
      <div className="flex items-center ml-8 p-2 ">
        <Link to="/">
          <BackIcon className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-row justify-evenly">
        <div className="w-[440px] h-[400px] bg-neutral-neu2 rounded-3xl">
          <img src="" alt="" className="bg-secondary-sec2" />
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="font-display text-display-lg text-secondary-sec2">
              Titulo
            </h1>
            <div className="flex flex-row space-x-8">
              <ListenIcon />
              <ReadIcon />
            </div>
          </div>

          <div className="flex flex-col h-40 justify-between mt-8">
            <h3 className="font-label text-label-lg text-neutral-neu2">
              Autor:
            </h3>
            <h3 className="font-label text-label-lg text-neutral-neu2">
              Idioma:
            </h3>
            <h3 className="font-label text-label-lg text-neutral-neu2">
              Categoria:
            </h3>
            <h3 className="font-label text-label-lg text-neutral-neu2">
              Número de páginas:
            </h3>
            <h3 className="font-label text-label-lg text-neutral-neu2">
              Duración del audio:
            </h3>
          </div>
          <div className="w-[500px] mt-8">
            <p className="font-body text-body-lg text-neutral-neu2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
              ipsa. Labore eveniet sint quidem reprehenderit, id distinctio
              laudantium similique dolores ex. Sapiente minima quam aliquid
              molestias a iusto sequi officiis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
