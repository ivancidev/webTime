import React, { useState } from "react";
import Check from "../../../icons/check";

const CardPref = ({ text, icon, cod, onSelect, text2, isSelected }) => {
  const handleCardClick = () => {
    onSelect({ id_tiempo_lectura: cod, minutos: text }, !isSelected);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative py-3 md:py-2 min-w-[122px] lg:h-[70px] rounded-xl flex flex-col items-center justify-center px-5 md:px-10 cursor-pointer hover:border-secondary-sec2 md:mr-7 lg:mr-12 ${
        isSelected
          ? "border-[3px] bg-secondary-sec4 border-secondary-sec2"
          : "border-2 bg-white border-primary-pri1"
      }`}
    >
      {isSelected && (
        <div className="absolute top-[-2px] right-[-2px]">
          <Check />
        </div>
      )}
      <img src={icon} alt={text} className="h-[35px] mb-2" />
      <p className="text-center text-sm text-secondary-sec1">{text}</p>
    </div>
  );
};

export default CardPref;
