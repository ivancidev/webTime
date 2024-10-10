import React from "react";
export const CardBook = ({ titleBook, frontBook }) => {
  return (
    <div className="w-50 h-70 bg-neutral-neu3 rounded-2xl flex flex-col items-center justify-center hover:border-4
    hover:border-secondary-sec1 transition duration-300 ease-in-out sm:w-60 sm:h-80 flex-none">

      <img src={frontBook} alt="" className="w-[200px] h-[250px] rounded-2xl sm:w-[220px] sm:h-[270px] flex-none" />
      <h3 className="font-title text-title-sm mt-2">{titleBook}</h3>

    </div>
  );
};
