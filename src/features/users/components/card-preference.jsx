import React, { useState } from "react";
import Check from "../../../icons/check";

const CardPref = ({ text, SvgIcon = "" }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      onClick={handleCardClick}
      className={` relative  h-[70px] rounded-xl flex flex-col items-center justify-center px-9 cursor-pointer  hover:border-secondary-sec2  ${
        isSelected
          ? "border-[3px] bg-secondary-sec4 border-secondary-sec2"
          : "border-2 bg-white border-primary-pri1 "
      }`}
    >
      {isSelected && (
        <div className="absolute top-[-2px] right-[-2px]">
          <Check />
        </div>
      )}
      {SvgIcon && <SvgIcon />}
      <h3 className="font-body text-body-md pt-1">{text}</h3>
    </div>
  );
};

export default CardPref;