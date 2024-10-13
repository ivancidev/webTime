import React from "react";
import { useNavigate } from "react-router-dom";
export const CardBook = ({ titleBook, frontBook, book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book-info/${book.codLibro}`, { state: { book } });
  };
  return (
    <div
      className="w-40 h-60 bg-neutral-neu3 rounded-2xl flex flex-col items-center justify-center hover:border-4
    hover:border-secondary-sec1 transition duration-300 ease-in-out sm:w-60 sm:h-80 flex-none"
      onClick={handleClick}
    >
      <img
        src={frontBook}
        alt=""
        className="w-[150px] h-[200px] rounded-2xl sm:w-[220px] sm:h-[270px] flex-none"
      />
      <h3 className="font-title text-center text-title-sm mt-2">{titleBook}</h3>
    </div>
  );
};
