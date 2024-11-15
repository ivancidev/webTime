import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";
import { useUserDetails } from "../../../hooks/use-user-details";

export const ForumComment = () => {
  return (
    <section className="max-h-screen">
      <div className="sticky top-2 sm:relative ml-6 md:ml-8 lg:ml-14 md:mt-2">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
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
