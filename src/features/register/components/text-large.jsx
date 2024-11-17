import React, { useState } from "react";

export const TextLarge = ({text, max, message, letter="text-neutral-neu0"}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  //const max = 250; 

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <p className={`${letter} font-body text-body-md text-justify leading-6`}>
        {isExpanded || text.length <= max
          ? text
          : `${text.substring(0, max)}...`}
      </p>
      {text.length > max && (
        <button
          onClick={toggleExpansion}
          className="text-secondary-sec2 font-body text-body-md hover:underline mt-2 text-justify"
        >
        {isExpanded ? `${message} menos` : `${message} más`}
        </button>
      )}
    </div>
  );
};
