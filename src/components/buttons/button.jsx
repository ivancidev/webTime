import React from "react";
const Button = ({
  type = "button",
  text,
  SvgIcon = "",
  variant = "combCol1",
  onClick,
  disabled = false,
}) => {
  const baseButton =
    "active:scale-95 font-label rounded-[20px] h-10 pl-4 pr-5 text-label-sm text-center flex items-center whitespace-nowrap";
  const varCol = {
    combCol1: "text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1", //boton skyblue a blue
    combCol2:
      "text-secondary-sec2 bg-neutral-neu3 border-[1px] border-secondary-sec2 hover:bg-secondary-sec2 hover:text-primary-pri3", //boton white-gray a skyblue
    combCol3: "text-primary-pri3 bg-secondary-sec1 hover:bg-secondary-sec2", // boton blue a skyblue
    combDesactivate: "bg-neutral-neu1 text-primary-pri3",
    combCol4:
      "w-[45px] md:w-[145px] text-secondary-sec1 bg-primary-pri3 border-[1px] border-secondary-sec1 rounded-[10px] hover:bg-neutral-neu2 ", //boton blanco con borde azul
    combExp:
      "w-[95%] sm:w-96 text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 mb-5",
    combExp2:
      "w-[85%] sm:w-90 text-secondary-sec2 bg-neutral-neu3 border-[1px] border-secondary-sec2 hover:bg-secondary-sec2 hover:text-primary-pri3",
    combSize:
      "w-[148px] text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1",
    combColBlackBlue: "text-primary-pri2 hover:text-secondary-sec2",
    combDesactivate2: "text-neutral-neu1",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseButton} ${varCol[variant]} flex items-center justify-center`}
    >
      {SvgIcon && <SvgIcon />}
      <p className="pl-2 text-center text-wrap">{text}</p>
    </button>
  );
};

export default Button;
