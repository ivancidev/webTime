import React, { useState } from "react";
import Logo from "../../assets/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";
import User from "../../icons/user";
import Burger from "../../icons/burger";
import { ModalUser } from "../../features/users/components/modal-user";
import { ModalMenu } from "../../features/users/components/modal-menu";
import ButtonIcon from "../buttons/buttonIcon";
import Fire from "../../icons/fire";
import { ModalStreak } from "../../features/users/components/modal-streak";

export const NavbarO = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isModalStreakOpen, setIsModalStreakOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setIsOpenUser(false);
  };
  const openUser = () => {
    setIsOpenUser(true);
    setIsOpen(false);
  };
  const closeUser = () => {
    setIsOpenUser(false);
  };

  const toggleModalStreak = () => {
    setIsModalStreakOpen(!isModalStreakOpen);
  };

  const location = useLocation();
  const isAppRoute = location.pathname === "/app";

  return (
    <nav className="relative sm:sticky sm:top-0 bg-primary-pri3 h-20 flex items-center px-6 z-50">
      <Link to="/app" className="w-full h-full pt-2">
        <img src={Logo} alt="Logo" />
      </Link>
      <div className="flex justify-end w-screen lg:hidden px-2 ">
        <ButtonIcon
          SvgIcon={Burger}
          variant={`${isOpen ? "combColBlue" : "combColBlack2"}`}
          onClick={toggleMenu}
        />
      </div>
      <ul className="hidden lg:flex items-center justify-end w-screen space-x-16 mr-16">
        <li>
          <Link
            to="/app"
            className={
              isAppRoute
                ? "font-label text-label-md text-secondary-sec1 hover:text-secondary-sec2 "
                : "font-label text-label-md text-primary-pri2 hover:text-secondary-sec2 "
            }
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
      <ButtonIcon
        variant="combColBlack2"
        onClick={toggleModalStreak}
        SvgIcon={Fire}
      />
      <ButtonIcon
        SvgIcon={User}
        variant={`${isOpenUser ? "combColBlue" : "combColBlack2"}`}
        onClick={openUser}
      />

      {isOpen && (
        <div className="flex absolute top-20 right-12 z-50">
          <ModalMenu />
        </div>
      )}
      {isOpenUser && (
        <div className="flex absolute top-20 right-0 z-50">
          <ModalUser onClose={closeUser} />
        </div>
      )}

      {isModalStreakOpen && <ModalStreak onClose={toggleModalStreak} />}
    </nav>
  );
};
