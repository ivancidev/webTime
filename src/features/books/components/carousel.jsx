import React, { useState } from "react";
import { CardBook } from "./cardBook";
import BeforeIcon from "../../../icons/before";
import ButtonIcon from "./buttonIcon";
import NextIcon from "../../../icons/next";

export const Carousel = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

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
    <div className="w-screen h-auto px-12">
      <div className="flex justify-between items-center">
        <ButtonIcon
          onClick={handlePrev}
          variant={isPrevDisabled ? "combDesactivate" : "combCol1"}
          disabled={isPrevDisabled}
          SvgIcon={BeforeIcon}
        />

        <div className="flex overflow-hidden space-x-12">
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
