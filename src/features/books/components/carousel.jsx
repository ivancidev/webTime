import React, { useState, useEffect } from "react";
import { CardBook } from "./cardBook";
import BeforeIcon from "../../../icons/before";
import ButtonIcon from "../../../components/Buttons/buttonIcon";
import NextIcon from "../../../icons/next";

export const Carousel = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //const itemsToShow = 4;
  const [itemsToShow, setItemsToShow] = useState(4); // Estado para items a mostrar

  // Ajustar itemsToShow según el tamaño de la ventana
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 700) {
      setItemsToShow(1); // 1 tarjeta en pantallas pequeñas
    } else if (width < 1050) {
      setItemsToShow(2); // 2 tarjetas en pantallas medianas
    } else if (width < 1300) {
      setItemsToShow(3); // 3 tarjetas en pantallas grandes
    } else {
      setItemsToShow(4); // 4 tarjetas en pantallas extra grandes
    }
  };

  // useEffect para manejar cambios en el tamaño de la ventana
  useEffect(() => {
    handleResize(); // Llama la función inicialmente
    window.addEventListener("resize", handleResize); // Escucha cambios en el tamaño de la ventana

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el evento al desmontar
    };
  }, []);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsToShow >= books.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? books.length - itemsToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === books.length - itemsToShow ? 0 : prevIndex + 1
    );
  };

  if (!books.length) {
    return (
      <div className="w-screen text-center">
        <h3 className="font-label text-label-md text-primary-pri3">
          No existen libros disponibles actualmente
        </h3>
      </div>
    );
  }

  return (
    <div className="w-screen h-auto px-6 sm:px-12">
      <div className="flex justify-between items-center">
        <ButtonIcon
          onClick={handlePrev}
          variant={isPrevDisabled ? "combDesactivate" : "combCol1"}
          disabled={isPrevDisabled}
          SvgIcon={BeforeIcon}
        />

        <div className="flex overflow-hidden space-x-6 sm:space-x-9 md:space-x-12 ">
          {books
            .slice(currentIndex, currentIndex + itemsToShow)
            .map((book, index) => (
              <CardBook
                key={index}
                titleBook={book.title}
                frontBook={book.image}
              />
            ))}
        </div>
        <ButtonIcon
          onClick={handleNext}
          variant={isNextDisabled ? "combDesactivate" : "combCol1"}
          disabled={isNextDisabled}
          SvgIcon={NextIcon}
        />
      </div>
    </div>
  );
};
