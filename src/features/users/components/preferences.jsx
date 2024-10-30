import React from "react";
import CardPref from "./card-preference";

export default function Preferences({ text, icons, variant, onSelect }) {
  return (
    <section className="flex flex-col mt-10 w-full">
      <div>
        <h1 className="mx-5 md:ml-28 font-display text-display-sm text-secondary-sec2 text-gradient">
          {text}
        </h1>
      </div>
      <div className={`flex flex-wrap gap-x-3 gap-y-5 md:gap-6 mx-5 md:mx-36 mt-10 max-w-full`}>
        {icons.map((iconText, index) => {
          const contentText =
            variant === "c"
              ? iconText.nombreCategoria
              : iconText.minutos + " minutos";
          const contentIcon =
            variant === "c"
              ? iconText.enlace_icono_categoria
              : iconText.enlace_icono_tiempo;
          return (
            <CardPref
              key={index}
              text={contentText}
              icon={contentIcon}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </section>
  );
}
