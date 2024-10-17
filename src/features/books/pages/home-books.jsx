import React from "react";
import { NavbarO } from "../components/navbarO";
import { Carousel } from "../components/carousel";
import { useGetData } from "../../../hooks/use-get-fooks";
import { CircularProgress } from "@mui/material";

export const Home = () => {
  const { data: books, isLoading, isError, error } = useGetData();
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-xl">Cargando libros...</h2>
      </div>
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="pb-12 bg-primary-pri3">
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
        Recién agregados
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Lo más leído esta semana
      </h1>
      <Carousel books={books} />
    </div>
  );
};
