import React, { useState } from "react";
import Logo from "../../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import User from "../../../icons/user";

export const NavbarO = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-primary-pri1 to-primary-pri2 h-20 flex items-center shadow-md px-6 relative">
      <img src={Logo} alt="Logo" className="h-16" />
      
      <div className="flex justify-end w-screen lg:hidden px-2">
        <button onClick={toggleMenu} className="focus:outline-none text-primary-pri3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            stroke={isOpen ? "#F4EFF4" : "#AEAAAE"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <ul className="hidden lg:flex items-center justify-end w-screen space-x-16 mr-16">
        <li>
          <Link className="text-primary-pri3 font-label text-label-md hover:text-secondary-sec3">
            Inicio
          </Link>
        </li>
        <li>
          <Link className="text-neutral-neu1 font-label text-label-md">
            Categorias
          </Link>
        </li>
        <li>
          <Link className="text-neutral-neu1 font-label text-label-md">
            Foros
          </Link>
        </li>
      </ul>

      {isOpen && (
        <div className="flex lg:hidden absolute top-20 right-0 w-30 bg-[0E1217] from-primary-pri1 to-primary-pri2 shadow-lg z-50">
          <ul className="flex flex-col items-start p-4 space-y-4 w-full">
            <li>
              <Link
                className="text-primary-pri3 font-label text-label-md hover:text-secondary-sec3"
                onClick={toggleMenu}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                className="text-neutral-neu1 font-label text-label-md"
                onClick={toggleMenu}
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link
                className="text-neutral-neu1 font-label text-label-md"
                onClick={toggleMenu}
              >
                Foros
              </Link>
            </li>
          </ul>
        </div>
      )}
      <User />
    </nav>
  );
};