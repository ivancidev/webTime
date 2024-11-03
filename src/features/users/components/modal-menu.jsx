import { useLocation,Link } from 'react-router-dom';

export const ModalMenu = () => {
  const location = useLocation();
  const isAppRoute = location.pathname === "/app";

  return (
    <div className="w-30 bg-primary-pri3 drop-shadow-2xl">
      <ul className="flex flex-col items-start p-3 space-y-4 w-full">
        <li>
          <Link
            to="/app"
            className={isAppRoute ? "font-label text-label-md text-secondary-sec1 hover:text-secondary-sec2 " 
                      : "font-label text-label-md text-primary-pri2 hover:text-secondary-sec2 "}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            className="text-neutral-neu1 font-label text-label-md"
          >
            Categorias
          </Link>
        </li>
        <li>
          <Link
            className="text-neutral-neu1 font-label text-label-md"
          >
            Foros
          </Link>
        </li>
      </ul>
    </div>
    );
};