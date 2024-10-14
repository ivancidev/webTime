import React from "react";
import { useNavigate } from "react-router-dom";
export const CardBook = ({ titleBook, frontBook, book }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/book-info/${book.codLibro}`, { state: { book } });
  };
  return (
    <div
      className="w-40 h-60 bg-primary-pri3 rounded-2xl flex flex-col justify-start border-[1px] border-primary-pri2 hover:bg-neutral-neu1 sm:w-60 sm:h-80 flex-none "
      onClick={handleClick}
    >
      <img
        src={frontBook}
        alt=""
        className="w-40 h-56 rounded-2xl rounded-b-none border-b-[1px] border-primary-pri2  sm:w-60 sm:h-72 flex-none"
      />
      <h3 className="font-title text-center text-title-sm mt-1">{titleBook}</h3>
    </div>
  );
};
