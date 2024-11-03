import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import FilterIcon from "../../../icons/filter";
import Calendar from "../../../icons/calendar";

const CompletedBooksSection = ({ completedBooksCount, onClick,variant="comb1"}) => {
    const varCol = {
        comb1: "text-primary-pri2 hover:text-secondary-sec2",
        comb2: "text-secondary-sec1 hover:text-secondary-sec2",
      };
  return (
    <div clasName="flex flex-col w-full">
        <div className="flex flex-col ml-20 md:ml-[150px] items-center w-fit mb-2">
            <button 
            className={`${varCol[variant]} rounded-[20px] w-9 sm:w-10 h-9 sm:h-10 flex flex-col items-center justify-center`}
            onClick={onClick}
            >
                <span className="text-title-md font-title">{completedBooksCount}</span>
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
