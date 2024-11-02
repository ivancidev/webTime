import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { NavbarO } from "../../../components/navbar/navbarO";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavbarO />
      <div className="">
        <div className="ml-14 mt-8">
          <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/app")} />
        </div>
        <div className="flex justify-center items-center  space-x-64">
          <div>
            <PerfilUser />
          </div>
          <div>
            <DailyStreak days="12" />
          </div>
        </div>
        <div className="mt-10">
          <CompletedBooksSection completedBooksCount="12" />
        </div>
      </div>
    </div>
  );
};
