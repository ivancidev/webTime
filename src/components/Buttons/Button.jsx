import React from "react";
export const Button = ({
  type = "button",
  text,
  SvgIcon,
  variant = "combCol1",
  onClick,
  disabled = false,
}) => {
  const baseButton =
    "font-label rounded-[20px] h-10 pl-4 pr-5 text-label-sm text-center flex items-center";
  const varCol = {
    combCol1: "text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1", //boton skyblue a blue
    combCol2:
      "text-secondary-sec2 bg-neutral-neu3 hover:bg-secondary-sec2 hover:text-primary-pri3", //boton white-gray a skyblue
    combCol3: "text-primary-pri3 bg-secondary-sec1 hover:bg-secondary-sec2", // boton blue a skyblue
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${varCol[variant]}`}
    >
      <SvgIcon />
      <p className="pl-2">{text}</p>
    </button>
  );
};
