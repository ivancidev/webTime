import React from "react";
import Logo from "../../../assets/icons/logo.svg";

export const Navbar = () => {
  return (
    <nav className="bg-primary-pri3 h-20 flex items-center px-4">
      <img src={Logo} alt="Logo" className="h-16" />
    </nav>
  );
};
