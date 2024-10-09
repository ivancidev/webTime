import React from "react";
import Logo from "../../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import User from "../../../icons/user";

export const NavbarO = () => {
  return (
    <nav className="bg-gradient-to-r from-primary-pri1 to-primary-pri2 h-20 flex items-center shadow-md px-6">
      <img src={Logo} alt="Logo" className="h-16" />
      <ul className="flex items-center justify-end w-screen space-x-16 mr-16">
        <li>
          <Link className="text-primary-pri3 font-label text-label-md hover:text-secondary-sec3">
            Inicio
          </Link>
        </li>

        <li>
          <Link className="text-neutral-neu1  font-label text-label-md">
            Categorias
          </Link>
        </li>

        <li>
          <Link className="text-neutral-neu1 font-label text-label-md">
            Foros
          </Link>
        </li>
      </ul>
      <User />
    </nav>
  );
};
