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
    <nav className="bg-primary-pri3 h-20 flex items-center px-6 relative">
      <img src={Logo} alt="Logo" className="h-16" />

      <div className="flex justify-end w-screen lg:hidden px-2 ">
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            stroke={isOpen ? "#000000" : "#AEAAAE"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <ul className="hidden lg:flex items-center justify-end w-screen space-x-16 mr-16">
        <li>
          <Link className="text-primary-pri2 font-label text-label-md hover:text-secondary-sec3">
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
<<<<<<< HEAD
        <div className="flex lg:hidden absolute top-20 right-0 w-28 bg-[#0E1217] bg-opacity-100 shadow-lg z-50">
=======
        <div className="flex lg:hidden absolute top-20 right-0 w-30 bg-primary-pri3 shadow-lg z-100">
>>>>>>> 4490eec2fa87f14185391bafe90f9d7ff1d14ba2
          <ul className="flex flex-col items-start p-4 space-y-4 w-full">
            <li>
              <Link
                className="text-primary-pri1 font-label text-label-md hover:text-secondary-sec3"
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
