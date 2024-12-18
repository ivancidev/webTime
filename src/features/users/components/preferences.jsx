import React from "react";
import CardPref from "./card-preference";

export default function Preferences({ text, icons, variant, onSelect, selectedOption }) {
  return (
    <section className="flex flex-col mt-10 w-full">
      <div>
        <h1 className="mx-5 md:mx-16 lg:ml-28 font-display text-display-sm text-secondary-sec2 text-gradient">
          {text}
        </h1>
      </div>
      <div className="flex flex-wrap gap-x-7 gap-y-5 md:gap-6 ml-12 mx-5 md:mx-16 lg:mx-36 mt-10 max-w-full">
        {icons.map((iconText, index) => {
          const code =
            variant === "c"
              ? iconText.codCategoria
              : iconText.id_tiempo_lectura;
          const contentText =
            variant === "c"
              ? iconText.nombreCategoria
              : `${iconText.minutos} minutos`;
          const contentIcon =
            variant === "c"
              ? iconText.enlace_icono_categoria
              : iconText.enlace_icono_tiempo;

          const isSelected = variant === "c"
            ? selectedOption.some((item) => item.codCategoria === code)
            : selectedOption && selectedOption.id_tiempo_lectura === code;

          return (
            <CardPref
              key={index}
              text={contentText}
              icon={contentIcon}
              onSelect={onSelect}
              cod={code}
              text2={text}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </section>
  );
}
