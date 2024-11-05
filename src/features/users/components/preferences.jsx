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
      <div className={`flex flex-wrap gap-x-7 gap-y-5 md:gap-6 ml-12 mx-5 md:mx-16 lg:mx-36 mt-10 max-w-full`}>
        {icons.map((iconText, index) => {
          const cod =
            variant === "c"
              ? iconText.codCategoria
              : iconText.id_tiempo_lectura;
          const contentText =
            variant === "c"
              ? iconText.nombreCategoria
              : iconText.minutos + " minutos";
          const contentIcon =
            variant === "c"
              ? iconText.enlace_icono_categoria
              : iconText.enlace_icono_tiempo;

          // Determinar si la tarjeta está seleccionada
          let isSelected = false;
          if (variant === "c") {
            isSelected = selectedOption.some(
              (item) => item.codCategoria === cod
            );
          } else {
            isSelected = selectedOption && selectedOption.id_tiempo_lectura === cod;
          }

          return (
            <CardPref
              key={index}
              text={contentText}
              icon={contentIcon}
              onSelect={onSelect}
              cod={cod}
              text2={text}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </section>
  );
}
