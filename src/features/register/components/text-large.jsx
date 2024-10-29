import React, { useState } from "react";

export const TextLarge = ({ sinopsis }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-8">
      <p className="font-body text-body-md text-neutral-neu0 text-justify leading-6">
        {isExpanded || sinopsis.length <= maxLength
          ? sinopsis
          : `${sinopsis.substring(0, maxLength)}...`}
      </p>
      {sinopsis.length > maxLength && (
        <button
          onClick={toggleExpansion}
          className="text-secondary-sec2 font-body text-body-md hover:underline mt-2 text-justify"
        >
          {isExpanded ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
};
