import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { NavbarO } from "../../../components/navbar/navbarO";
import BackIcon from "../../../icons/back";
import { PerfilUser } from "../components/perfil-user";
import { useGetBooks } from "../../../hooks/use-get-books";
import { CardBook } from "../../books/components/cardBook";
import CompletedBooksSection from "../components/completed-books";
import { DailyStreak } from "../components/daily-streak";

export const Profile = () => {
    return (
        <div>
            <NavbarO />
            <div className="">
                <div className="ml-6 md:ml-8 lg:ml-14 md:mt-8">
                    <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/app")} />
                </div>
                <div className="flex justify-center items-center lg:space-x-64 flex-col md:flex-row space-x-4 mt-5 lg:mt-0">
                    <div>
                       <PerfilUser />
                    </div>
                    <div className="mt-5 md:mt-0">
                        <DailyStreak days="12" />
                    </div>
                </div>
                <div className="mt-5 md:mt-10 ">
                    <CompletedBooksSection completedBooksCount="12"/>
                </div>
            </div>
        </div>
    );
};
