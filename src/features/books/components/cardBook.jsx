import { useNavigate } from "react-router-dom";
import { useAudio } from "../../../context/audio-context";

export const CardBook = ({ titleBook, frontBook, authorBook, book }) => {
  const navigate = useNavigate();
  const { setShowAudioPlay } = useAudio();

  const handleClick = () => {
    setShowAudioPlay(false);
    localStorage.setItem("book", JSON.stringify(book));
    navigate(`book-info/${book.codLibro}`, {
      state: { book },
    });
  };

  return (
    <div
      className="w-40 h-50 bg-primary-pri3 rounded-2xl flex flex-col justify-start cursor-pointer group sm:w-60 sm:h-[340px] flex-none"
      onClick={handleClick}
    >
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
