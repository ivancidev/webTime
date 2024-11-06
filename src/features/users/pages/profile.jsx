import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { NavbarO } from "../../../components/navbar/navbarO";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";
import { useUserDetails } from "../../../hooks/use-user-details";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { userDetails } = useUserDetails(user);
  return (
    <section>
      <div className="ml-6 md:ml-8 lg:ml-14 md:mt-8">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/app")} />
      </div>
      <div className="flex justify-center items-center lg:space-x-64 flex-col md:flex-row space-x-4 mt-5 lg:mt-0">
        <div>
          <PerfilUser />
        </div>
        <div className="mt-5 md:mt-0">
          {userDetails ? (
            <DailyStreak days={userDetails.dias_racha} />
          ) : (
            <DailyStreak />
          )}
        </div>
      </div>
      <div className="mt-10 md:mt-16 ">
        <CompletedBooksSection />
      </div>
    </section>
  );
};
