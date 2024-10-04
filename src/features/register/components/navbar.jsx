import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-primary-pri1 to-primary-pri2 h-20 flex items-center shadow-md px-4">
      <img 
        src="/src/assets/icons/logo.svg" 
        alt="Logo" 
        className="h-16" 
      />
    </nav>
  );
};