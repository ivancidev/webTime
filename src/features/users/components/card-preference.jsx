import React from "react";
import Check from "../../../icons/check";

const CardPref = ({ text, icon, cod, onSelect, text2, isSelected }) => {
  const handleCardClick = () => {
    onSelect(
      text2 === "Elige las categorías de tu interés"
        ? { codCategoria: cod, nombreCategoria: text }
        : { id_tiempo_lectura: cod, minutos: text },
      !isSelected
    );
  };

  const cardClassNames = `relative py-3 md:py-2 min-w-[122px] lg:h-[70px] rounded-xl flex flex-col items-center justify-center px-5 md:px-10 cursor-pointer hover:border-secondary-sec2 md:mr-7 lg:mr-12 ${
    isSelected
      ? "border-[3px] bg-secondary-sec4 border-secondary-sec2"
      : "border-2 bg-white border-primary-pri1"
  }`;

  return (
    <div onClick={handleCardClick} className={cardClassNames}>
      {isSelected && (
        <div className="absolute top-[-2px] right-[-2px]">
          <Check />
        </div>
      )}
      <img src={icon} alt="" className="w-7 h-7" />
      <h3 className="font-body text-body-md pt-1">{text}</h3>
    </div>
  );
};

export default CardPref;
