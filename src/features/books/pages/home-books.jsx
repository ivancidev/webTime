import React from "react";
import { NavbarO } from "../components/navbarO";
import { Carousel } from "../components/carousel";
import { useGetData } from "../../../hooks/use-get-fooks";

export const Home = () => {
  const { data: books, isLoading, isError, error } = useGetData();
  if (isLoading) return <div>Cargando libros...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(books);

  return (
    <div className="pb-12">
      <NavbarO />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Los más vistos
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Mejor calificados
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Recien agregados
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Los más leidos esta semana
      </h1>
      <Carousel books={books} />
    </div>
  );
};
