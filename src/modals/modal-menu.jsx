import { useState } from "react";
import { set } from "react-hook-form";
import { useLocation, Link } from "react-router-dom";

export const ModalMenu = ({ setIsOpen }) => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const handlenChangePath = (path) => {
    setPath(path);
    setIsOpen(false);
  };

  return (
    <div className="w-30 bg-primary-pri3 drop-shadow-2xl">
      <ul className="flex flex-col items-start p-3 space-y-4 w-full">
        <li>
          <Link
            to="/app"
            onClick={() => handlenChangePath("/app")}
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
          <Link className="text-neutral-neu1 font-label text-label-md">
            Categorias
          </Link>
        </li>
        <li>
          <Link
            to="forums"
            onClick={() => handlenChangePath("/app/forums")}
            className={
              path === "/app/forums"
                ? "font-label text-label-md text-secondary-sec1 hover:text-secondary-sec2 "
                : "font-label text-label-md text-primary-pri2 hover:text-secondary-sec2 "
            }
          >
            Foros
          </Link>
        </li>
      </ul>
    </div>
  );
};
