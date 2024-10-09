import React from "react";
export const CardBook = ({ titleBook, frontBook }) => {
  return (
    <div className="w-60 h-80 bg-neutral-neu3 rounded-2xl flex flex-col items-center justify-center hover:border-4 hover:border-secondary-sec1 transition duration-300 ease-in-out">
      <img src={frontBook} alt="" className="w-[220px] h-[270px] rounded-2xl" />
      <h3 className="font-title text-title-sm mt-2">{titleBook}</h3>
    </div>
  );
};
