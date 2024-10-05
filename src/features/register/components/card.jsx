import React from "react";
import Button from "../../../components/Buttons/Button";

export const Card = ({ title, textButton, icon, image }) => {
  return (
    <div className="w-[1000px] h-36 p-4 bg-transparent border border-neutral-neu2 rounded-[20px]">
      <div className="flex">
        <img src={image} alt="" className="w-6 h-6" />
        <h3 className="font-title text-title-sm text-primary-pri3 ">{title}</h3>
      </div>
      <Button text={textButton} />
    </div>
  );
};
