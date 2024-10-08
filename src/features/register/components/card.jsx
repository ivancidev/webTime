import React from "react";
import Button from "../../../components/buttons/button";

export const Card = ({ title, SVG, ImageSVG }) => {
  return (
    <div className="w-[1000px] h-36 p-6 bg-transparent border border-neutral-neu2 rounded-[20px] flex flex-row justify-between">
      <div className="w-60 flex flex-col justify-center items-center">
        <div className="flex flex-row mb-4">
          <SVG className="w-6 h-6" />
          <h3 className="font-title text-title-sm text-primary-pri3 ml-4">
            {title}
          </h3>
        </div>
        <Button text="Elegir archivo"  />
      </div>
      <div className="w-60 flex items-center">
        <p className="font-body text-body-lg text-primary-pri3">
          No se elegio ningun archivo
        </p>
      </div>
      <div className="w-60">
        {title !== "Archivo de audio" && ImageSVG && (
          <ImageSVG className="w-60 h-[106px] rounded-[20px]" />
        )}
      </div>
    </div>
  );
};
