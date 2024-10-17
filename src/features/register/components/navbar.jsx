import React from "react";
import Logo from "../../../assets/icons/logo.svg";

export const Navbar = () => {
  return (
    <nav className="bg-primary-pri3 h-20 flex items-center px-6">
      <div to="/" className="w-full h-full pt-2">
        <img src={Logo} alt="Logo" />
      </div>
    </nav>
  );
};
