import React from "react";
import CardPref from "./card-preference";

export default function Preferences({ text, icons, variant, onSelect }) {
  return (
    <section className="flex flex-col mt-10">
      <div>
        <h1 className="ml-28 font-display text-display-sm bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent">
          {text}
        </h1>
      </div>
      <div className={`flex flex-wrap gap-6 mx-36 mt-10`}>
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
