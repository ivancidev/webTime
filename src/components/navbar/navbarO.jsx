import React, { useState } from "react";
import Logo from "../../assets/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";
import User from "../../icons/user";
import { ModalUser } from "../../features/users/components/modal-user";

export const NavbarO = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const openUser = () => {
    setIsOpenUser(true);
  };
  const closeUser = () => {
    setIsOpenUser(false);
  };

  const location = useLocation(); 

  return (
    <nav className="relative sm:sticky sm:top-0 bg-primary-pri3 h-20 flex items-center px-6 z-50">
      <Link to="/app" className="w-full h-full pt-2">
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="flex justify-end w-screen lg:hidden px-2 ">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
            stroke={isOpen ? "#0123FD" : "#AEAAAE"}
            className=" hover:stroke-secondary-sec2"
          />
          </svg>
        </button>
      </div>

      <ul className="hidden lg:flex items-center justify-end w-screen space-x-16 mr-16">
        <li>
          <Link
            to="/app"
            className="font-label text-label-md text-secondary-sec1 hover:text-secondary-sec2 "
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link className="text-neutral-neu1 font-label text-label-md cursor-default">
            Categorias
          </Link>
        </li>
        <li>
          <Link className="text-neutral-neu1 font-label text-label-md cursor-default">
            Foros
          </Link>
        </li>
      </ul>

      {isOpen && (
        <div className="flex lg:hidden absolute top-20 right-0 w-30 bg-primary-pri3 shadow-lg z-50">
          <ul className="flex flex-col items-start p-4 space-y-4 w-full">
            <li>
              <Link
                to="/app"
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
      <User onClick={ openUser} stroke={isOpenUser ? "#0123FD" : "#AEAAAE"}/>
      {isOpenUser && (
        <div className="flex absolute top-20 right-0 z-50">
          <ModalUser onClose={closeUser}/>
        </div>
      )}
    </nav> 
  );
};
