import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteBookModal } from "../components/delete-book-modal";

export const CardBook = ({
  titleBook,
  frontBook,
  authorBook,
  book,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    localStorage.setItem("book", JSON.stringify(book));
    navigate(`/app/book-info/${book.codLibro}`, {
      state: { book },
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);

  return (
    <div
      className="relative w-40 h-50 bg-primary-pri3 rounded-2xl flex flex-col justify-start cursor-pointer group sm:w-60 sm:h-[340px] flex-none"
      onClick={handleClick}
    >
      {/* Botón de eliminar con "X" */}
      <button
        className="absolute top-2 right-2 bg-error-err2 text-primary-pri3 font-label text-label-sm w-7 h-7 rounded-full z-10 flex items-center justify-center hover:bg-error-err3"
        onClick={(e) => {
          e.stopPropagation(); // Evita que el clic en la "X" dispare handleClick
          onDelete?.(book);
        }}
      >
        X
      </button>
      <img
        src={frontBook}
        alt=""
        className="w-40 h-56 rounded-2xl sm:w-60 sm:h-[285px] flex-none border-2 border-transparent group-hover:border-secondary-sec2"
      />
      <h3 className="mx-2 font-label text-center text-label-md mt-2 truncate px-1 group-hover:text-secondary-sec2">
        {titleBook}
      </h3>
      <h1 className="mx-2 mb-1 mt-1 md:mb-0 font-label text-center text-label-sm truncate px-1 text-neutral-neu0 group-hover:text-secondary-sec2">
        {authorBook}
      </h1>
    </div>
  );
};
