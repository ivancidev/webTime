import React from "react";
import { NavbarO } from "../components/navbarO";
import { Carousel } from "../components/carousel";

export const Home = () => {
  return (
    <div className="pb-12">
      <NavbarO />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Los más vistos
      </h1>
      <Carousel books={booksData} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Mejor calificados
      </h1>
      <Carousel books={booksData} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Recien agregados
      </h1>
      <Carousel books={booksData} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Los más leidos esta semana
      </h1>
      <Carousel books={booksData} />
    </div>
  );
};
{
  /*Datos de prueba*/
}
const booksData = [
  { title: "Libro 1", image: "/src/assets/icons/logo.svg" },
  { title: "Libro 2", image: "/src/assets/icons/logo.svg" },
  { title: "Libro 3", image: "/src/assets/icons/logo.svg" },
  { title: "Libro 4", image: "/src/assets/icons/logo.svg" },
  { title: "Libro 5", image: "/src/assets/icons/logo.svg" },
  { title: "Libro 6", image: "/src/assets/icons/logo.svg" },
];
