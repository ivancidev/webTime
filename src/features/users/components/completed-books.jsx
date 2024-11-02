import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import Calendar from "../../../icons/calendar";
import Button from "../../../components/buttons/button";

const CompletedBooksSection = ({ completedBooksCount }) => {
  return (
    <div clasName="flex flex-col w-full">
        <div className="flex flex-col ml-[150px] items-center w-fit mb-2">
            <button 
            className="rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center text-primary-pri2 hover:text-secondary-sec2"
            >
                <span className="text-title-md font-title">
                    {completedBooksCount}
                </span>
                <span className="text-body-md font-body">Concluidos</span>
            </button>
        </div>
        <div className="flex flex-row items-center mx-14">
            <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
            <div className="flex-grow border-t border-neutral-neu1"></div>
            <div className="w-2 h-2 bg-neutral-neu1 rounded-full"></div>
        </div>
        <div className="flex justify-end w-full pr-20 mt-3">
            <ButtonIcon
                SvgIcon={FilterIcon}
                variant="combColBlack2"
            />
            <ButtonIcon
                SvgIcon={Calendar}
                variant="combColBlack2"
            />
        </div>
    </div>
  );
};

export default CompletedBooksSection;