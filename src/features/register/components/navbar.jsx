import React from "react";
import Logo from "../../../assets/icons/logo.svg";

export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary-pri1 to-primary-pri2 h-20 flex items-center shadow-md px-4">
      <img 
        src={Logo} 
        alt="Logo" 
        className="h-16" 
      />
    </nav>
  );
};