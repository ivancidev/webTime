import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ text, image, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else {
      console.warn("No route provided");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="hover:bg-white bg-[#0297FF] w-auto h-10 p-1 text-white rounded-[100px] flex items-center justify-center"
    >
      <img src={image} alt="" className="pr-3" />
      <p>{text}</p>
    </button>
  );
};

export default Button;
