import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/button";
import { ModalFilter } from "../../books/components/modal-filter";
import CalendarIcon from "../../../icons/calendar";
import { Calendar } from "./calendar";
import { supabase } from "../../../services/supabaseClient";

const CompletedBooksSection = ({ completedBooksCount }) => {

    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const toggleCalendar = () => {
      setCalendarOpen(!isCalendarOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleFilterClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleApplyFilters = ({ categories, languages }) => {
        setSelectedCategories(categories);
        setSelectedLanguages(languages);
    };

    return (
        <div clasName="flex flex-col w-full">
            <div className="flex flex-col ml-20 md:ml-[150px] items-center w-fit mb-2">
                <button className="rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center text-primary-pri2 hover:text-secondary-sec2">
                    <span className="text-title-md font-title">
                        {completedBooksCount}
                    </span>
                    <span className="text-body-md font-body">Concluidos</span>
                </button>
            </div>
            <div className="flex flex-row items-center mx-8 md:mx-14">
                <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
                <div className="flex-grow border-t border-neutral-neu1"></div>
                <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
            </div>
            <div className="flex justify-end w-full md:pr-20 pr-10 mt-3">
                <ButtonIcon
                    SvgIcon={FilterIcon}
                    variant="combColBlack2"//{`${isModalOpen ? "combColBlue" : "combColBlack2"}`}
                    onClick={handleFilterClick}
                />
                <ButtonIcon
                    SvgIcon={CalendarIcon}
                    variant="combColBlack2"
                    onClick={toggleCalendar}
                />
            </div>
            {isModalOpen && (
                <ModalFilter
                    onClose={handleFilterClick}
                    onApplyFilters={handleApplyFilters}
                    selectedCategories={selectedCategories}
                    selectedLanguages={selectedLanguages}
                />
            )}
            {isCalendarOpen && <Calendar onClose={toggleCalendar} />}
        </div>
    );
};

export default CompletedBooksSection;
