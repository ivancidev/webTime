import React from "react";
import { NavbarO } from "../components/navbarO";
import { Carousel } from "../components/carousel";
import { useGetData } from "../../../hooks/use-get-fooks";
import { CircularProgress } from "@mui/material";

export const Home = () => {
  const { data: books, isLoading, isError, error } = useGetData();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="success" size={100} />
      </div>
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="pb-12 bg-primary-pri3">
      <NavbarO />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Los más visto
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Mejor calificado
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Recién agregados
      </h1>
      <Carousel books={books} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Lo más leidos esta semana
      </h1>
      <Carousel books={books} />
    </div>
  );
};
