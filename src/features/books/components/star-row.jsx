import { useState } from "react";
import Star from "../../../icons/star";
import StarHappy from "../../../icons/star-happy";
import StarPressed from "../../../icons/star-pressed";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const StarRow = () => {
  
    return (
        <div className="flex flex-row w-full justify-center h-auto space-x-2">
            <ButtonIcon 
                SvgIcon={StarHappy}  
                variant="combYe"
            />
            <ButtonIcon 
                SvgIcon={StarPressed}  
                variant="combYe"
            />
            <ButtonIcon 
                SvgIcon={Star}  
                variant="combYe"
            />
            <ButtonIcon 
                SvgIcon={Star}  
                variant="combYe"
            />
            <ButtonIcon 
                SvgIcon={Star}  
                variant="combYe"
            />
        </div>
    );
};
