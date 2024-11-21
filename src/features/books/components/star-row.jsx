import { useState } from "react";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const StarRow = () => {
  
    return (
        <div className="flex flex-row w-full justify-center h-auto">
            <ButtonIcon 
                SvgIcon={StarHappy}  
                variant="combColBlue"
            />
            <ButtonIcon SvgIcon={StarPressed} />
            <ButtonIcon SvgIcon={Star} />
            <ButtonIcon SvgIcon={Star} />
            <ButtonIcon SvgIcon={Star} />
        </div>
    );
};
