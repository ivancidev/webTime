import { useNavigate } from "react-router-dom";
import { useAudio } from "../../../context/audio-context";
export const CardBook = ({ titleBook, frontBook, book, isCompleted }) => {
  const navigate = useNavigate();
  const { setShowAudioPlay } = useAudio();
  const handleClick = () => {
    setShowAudioPlay(false);
    localStorage.setItem("book", JSON.stringify(book));
    navigate(`app/book-info/${book.codLibro}`, {
      state: { book },
    });
  };
  return (
    <div
      className="relative w-40 h-50 bg-primary-pri3 rounded-2xl flex flex-col justify-start border-[1px] border-primary-pri2 hover:bg-secondary-sec2 hover:bg-opacity-75 hover:text-primary-pri3 sm:w-60 sm:h-80 flex-none cursor-pointer"
      onClick={handleClick}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-secondary-sec2 text-primary-pri3 font-label text-label-sm  w-20 h-7 rounded-md z-10 flex items-center justify-center">
          Concluido
        </div>
      )}
      <img
        src={frontBook}
        alt=""
        className="w-40 h-56 rounded-2xl rounded-b-none border-b-[1px] border-primary-pri2  sm:w-60 sm:h-72 flex-none"
      />
      <h3 className="font-title text-center text-title-sm mt-1  truncate px-1">
        {titleBook}
      </h3>
    </div>
  );
};
