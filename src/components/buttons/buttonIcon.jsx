import React from "react";
const ButtonIcon = ({
  type = "button",
  SvgIcon = "",
  variant = "combCol1",
  onClick,
  disabled = false,
}) => {
  const baseButton =
    "rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center";
  const varCol = {
    combCol1: "bg-secondary-sec2 hover:bg-secondary-sec1", //boton skyblue a blue
    combCol3: "bg-secondary-sec1 hover:bg-secondary-sec2", // boton blue a skyblue
    combDesactivate: "bg-secondary-sec2 opacity-25", //boton desactivado
    combColTrans: "text-primary-pri3 bg-transparent hover:text-secondary-sec2", // boton sin fondo y con icono blanco
    combColBlack: "text-primary-pri2 hover:text-secondary-sec1", //boton negro  que cambia a azul
    combColBlack2: "text-primary-pri2 hover:text-secondary-sec2", //boton negro  que cambia a celeste
    combColTrans2: "text-primary-pri3 bg-transparent hover:text-secondary-sec1", // boton sin fondo y con icono azul
    combColBlue: "text-secondary-sec1",
    combColZ: "text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1", // boton sin fondo y con icono
    combColNeu:
      "text-neutral-neu0 bg-neutral-neu2 hover:bg-secondary-sec2 hover:text-primary-pri3", //boton gris
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${varCol[variant]}`}
    >
      {SvgIcon && <SvgIcon />}
    </button>
  );
};

export default ButtonIcon;
