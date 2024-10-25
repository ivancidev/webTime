import React from "react";
import { Facebook } from "../../icons/facebook";
import { Twiter } from "../../icons/twiter";
import { Youtube } from "../../icons/youtube";
export const Footer = () => {
  return (
    <div className="w-full flex flex-row justify-between px-8  pt-10 pb-3 items-center">
      <p className=" font-label text-label-md text-neutral-neu1">
        &copy; 2024 Webtime. Todos los derechos reservados.
      </p>
      <div className="flex flex-row items-center justify-evenly w-36">
        <Facebook />
        <Twiter />
        <Youtube />
      </div>
    </div>
  );
};
