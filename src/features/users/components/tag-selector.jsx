import React, { useState } from "react";

export const TagSelector = ({ textTag, isSelected, onToggle }) => {
  return (
    <div
      onClick={onToggle} // Llamar a la función pasada por las propiedades
      className={`h-10 flex items-center justify-center px-4 rounded-full cursor-pointer border my-2 mr-4 ${
        isSelected
          ? "bg-secondary-sec2 text-primary-pri3"
          : "border-neutral-neu0 text-neutral-neu0 hover:border-secondary-sec2 hover:text-secondary-sec2"
      }`}
    >
      <h2 className="font-label text-label-sm">{textTag}</h2>
    </div>
  );
};
