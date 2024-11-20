import ButtonIcon from "../../../components/buttons/buttonIcon";
import Check from "../../../icons/check";
import CloseSmall from "../icons/closeSmall";

export const CardBookCol = ({
  titleBook,
  frontBook,
  deleteBook,
  isSelect,
  toggleSelect,
}) => {
  return (
    <div className="relative w-[130px] bg-primary-pri3 rounded-2xl flex flex-col justify-start  cursor-pointer hover:text-secondary-sec2 mt-2">
      {deleteBook && (
        <div className="absolute top-2 right-2 ">
          <button
            onClick={deleteBook}
            className="w-5 h-5 bg-secondary-sec2 flex items-center justify-center rounded-full hover:bg-secondary-sec1"
          >
            <CloseSmall />
          </button>
        </div>
      )}

      {isSelect && (
        <div className="absolute top-2 right-2">
          <button className="w-5 h-5 bg-secondary-sec2 flex items-center justify-center rounded-full ">
            <Check />
          </button>
        </div>
      )}
      <div onClick={toggleSelect}>
        <img
          src={frontBook}
          alt="book cover"
          className={`w-[140px] h-40 rounded-2xl border ${
            isSelect ? " border-secondary-sec2" : "border-transparent"
          } hover:border-secondary-sec2`}
        />

        <h3
          className={`mx-2 font-label text-center text-label-md mt-2 truncate px-1 ${
            isSelect ? "text-secondary-sec2" : ""
          }`}
        >
          {titleBook}
        </h3>
      </div>
    </div>
  );
};
