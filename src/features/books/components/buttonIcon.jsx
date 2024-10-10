import React from "react";
const ButtonIcon = ({
  type = "button",
  text,
  SvgIcon = "",
  variant = "combCol1",
  onClick,
  disabled = false,
}) => {

  const baseButton =
    "rounded-[20px] w-10 h-10 flex flex-col items-center justify-center";
  const varCol = {
    combCol1: "text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1", //boton skyblue a blue
    combCol3: "text-primary-pri3 bg-secondary-sec1 hover:bg-secondary-sec2", // boton blue a skyblue
    combDesactivate: "text-primary-pri3 bg-secondary-sec2 opacity-25", //boton desactivado
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${varCol[variant]}`}
    >
      {SvgIcon && <SvgIcon />}
      <p className="pl-2">{text}</p>
    </button>
  );
};

export default ButtonIcon;
