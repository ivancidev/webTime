import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";
import { useUserDetails } from "../../../hooks/use-user-details";
import { useCompletedBooks } from "../../../hooks/use-get-books-completed";
import { CollectionBooks } from "../../collections/components/collection-books";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { userDetails } = useUserDetails(user);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("Concluidos");

  useEffect(() => {
    const getCompletedBooks = async () => {
      const books = await useCompletedBooks(user.id_usuario);
      setCompletedBooks(books);
    };

    getCompletedBooks();
  }, []);

  return (
    <section className="max-h-screen">
      <div className="sticky top-2 sm:relative ml-6 md:ml-8 lg:ml-14 md:mt-8">
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
        <div className="flex flex-row">
          <div
            onClick={() => setSelectedSection("Concluidos")}
            className={`flex flex-col ml-[90px] md:ml-[150px] items-center w-fit mb-2 cursor-pointer hover:text-secondary-sec2 ${
              selectedSection === "Concluidos" ? "text-secondary-sec2" : ""
            }`}
          >
            <span className="text-title-lg font-title ">
              {completedBooks?.length}
            </span>
            <span className="text-body-md font-body">Concluidos</span>
          </div>
          <div
            onClick={() => setSelectedSection("Colecciones")}
            className={`flex flex-col ml-[90px] md:ml-[150px] items-center w-fit mb-2 cursor-pointer hover:text-secondary-sec2 ${
              selectedSection === "Colecciones" ? "text-secondary-sec2" : ""
            }`}
          >
            <span className="text-title-lg font-title ">
              {completedBooks?.length}
            </span>
            <span className="text-body-md font-body">Colecciones</span>
          </div>
        </div>

        <div className="flex flex-row items-center mx-8 md:mx-14">
          <div className="w-2 h-2 bg-secondary-sec2 rounded-full"></div>
          <div className="flex-grow border-t border-secondary-sec2"></div>
          <div className="w-2 h-2 bg-secondary-sec2 rounded-full"></div>
        </div>

        {selectedSection === "Concluidos" ? (
          <CompletedBooksSection />
        ) : (
          <CollectionBooks />
        )}
      </div>
    </section>
  );
};
