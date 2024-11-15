import { useState } from "react";
import Logo from "../../assets/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";
import User from "../../icons/user";
import Burger from "../../icons/burger";
import { ModalUser } from "../../modals/modal-user";
import ButtonIcon from "../buttons/buttonIcon";
import { Streak } from "../../icons/streak";
import { useUserDetails } from "../../hooks/use-user-details";
import { ModalMenu } from "../../modals/modal-menu";
import { ModalStreak } from "../../features/users/modals/modal-streak";

export const NavbarO = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModalStreakOpen, setIsModalStreakOpen] = useState(false);
  const { userDetails } = useUserDetails(user);
  const daysStreak = localStorage.getItem("diasRacha") || 0;
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handleChangePath = (path) => {
    setPath(path);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsOpenUser(false);
      setIsModalStreakOpen(false);
    }
  };
  const openUser = () => {
    setIsOpenUser(true);
    setIsOpen(false);
    setIsModalStreakOpen(false);
  };
  const closeUser = () => {
    setIsOpenUser(false);
  };

  const toggleModalStreak = () => {
    setIsModalStreakOpen(!isModalStreakOpen);
    if (!isModalStreakOpen) {
      setIsOpen(false);
      setIsOpenUser(false);
    }
  };

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
            onClick={() => handleChangePath("/app")}
            className={
              path === "/app"
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
          <Link
            to="foros"
            onClick={() => handleChangePath("/app/foros")}
            className={
              path === "/app/foros"
                ? "font-label text-label-md text-secondary-sec1 hover:text-secondary-sec2 "
                : "font-label text-label-md text-primary-pri2 hover:text-secondary-sec2 "
            }
          >
            Foros
          </Link>
        </li>
      </ul>
      <div
        className="flex flex-row items-center mr-5 cursor-pointer"
        onClick={toggleModalStreak}
      >
        <ButtonIcon
          variant={`${isModalStreakOpen ? "combColBlue" : "combColskyblue"}`}
          SvgIcon={Streak}
        />

        <h2
          className={`${
            isModalStreakOpen
              ? "font-title text-title-sm text-secondary-sec1 pt-1"
              : "font-title text-title-sm text-secondary-sec2 pt-1"
          }`}
        >
          {daysStreak}
        </h2>
      </div>

      {isOpen && (
        <div className="flex absolute top-20 right-28 z-50">
          <ModalMenu setIsOpen={setIsOpen} />
        </div>
      )}
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={openUser}
        />
      ) : (
        <ButtonIcon
          SvgIcon={User}
          variant={`${isOpenUser ? "combColBlue" : "combColBlack2"}`}
          onClick={openUser}
        />
      )}
      {isOpenUser && (
        <div className="flex absolute top-20 right-0 z-50">
          <ModalUser
            onClose={closeUser}
            imgUser={user.avatar}
            nickname={user.nombre_usuario}
          />
        </div>
      )}
      {isModalStreakOpen && (
        <ModalStreak
          onClose={toggleModalStreak}
          daysStreak={userDetails.dias_racha}
          time={userDetails.minutos}
        />
      )}
    </nav>
  );
};
