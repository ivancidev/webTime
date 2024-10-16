import React from "react";
import { Carousel } from "../components/carousel";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CircularProgress } from "@mui/material";
import { useGetRecentBooks } from "../../../hooks/use-recent-book";

export const Home = () => {
  const {
    data: books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
    error: errorBooks,
  } = useGetBooks();
  const {
    data: recentBooks,
    isLoading: isLoadingRecent,
    isError: isErrorRecent,
    error: errorRecent,
  } = useGetRecentBooks();
  if (isLoadingBooks || isLoadingRecent) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-xl">Cargando libros...</h2>
      </div>
    );
  }
  if (isErrorBooks) return <div>Error: {errorBooks.message}</div>;
  if (isErrorRecent) return <div>Error: {errorRecent.message}</div>;

  return (
    <div className="pb-12 bg-primary-pri3">
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
      <Carousel books={recentBooks} />
      <h1 className="text-secondary-sec2 font-title text-title-md my-6 ml-20">
        Lo más leído esta semana
      </h1>
      <Carousel books={books} />
    </div>
  );
};
