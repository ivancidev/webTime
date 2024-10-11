import React from "react";
const ButtonIcon = ({
  type = "button",
  SvgIcon = "",
  variant = "combCol1",
  onClick,
  disabled = false,
}) => {
  const baseButton =
    "rounded-[20px] w-10 h-10 flex flex-col items-center justify-center";
  const varCol = {
    combCol1: "bg-secondary-sec2 hover:bg-secondary-sec1", //boton skyblue a blue
    combCol3: "bg-secondary-sec1 hover:bg-secondary-sec2", // boton blue a skyblue
    combDesactivate: "bg-secondary-sec2 opacity-25", //boton desactivado
    combColTrans: "text-primary-pri3 bg-transparent hover:text-secondary-sec2", // boton sin fondo y con icono blanco

    combColPlay: "text-primary-pri2 bg-neutral-neu2 ", //boton con fondo plomo
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
