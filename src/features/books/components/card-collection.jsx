export const CardAddCollection = ({ collectionName, amountBooks, books }) => {
  return (
    <div className="flex items-center w-full hover:text-secondary-sec2 cursor-pointer mt-3">
      <div className="rounded-full w-20">
        <img
          src={books[0].enlacePortada}
          alt="book front"
          className="w-[65px] h-[90px] object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="mx-2 font-label text-center text-label-md mt-2 truncate px-1">
          {collectionName}
        </h3>
        <h1 className="mx-2 mb-1 mt-2 md:mb-0 font-label text-label-md truncate px-1 text-neutral-neu0">
          {amountBooks} libros
        </h1>
      </div>
    </div>
  );
};
