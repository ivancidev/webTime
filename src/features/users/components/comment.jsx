import { TextLarge } from "../../register/components/text-large";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Button from "../../../components/buttons/button";
import Dislike from "../../../icons/dislike";
import UserProf from "../../../icons/userProfile";
import Like from "../../../icons/like";
import User from "../../../icons/user";

export const Comment = (text) => {
    return (
        <div className="py-5 px-8 bg-primary-pri3 border-neutral-neu1 border rounded-xl w-full">
            <div className="flex flex-row items-center space-x-3">
                {picture ? (
                    <img
                        src={picture}
                        className="w-[10px] h-[10px] object-cover rounded-full"
                    />
                    ) : (
                    <UserProf size={40}/>
                    )}
                
                <div className="flex flex-col">
                    <h2 className="font-label text-label-md">{nameUser}</h2>
                    <h2 className="text-neutral-neu0 text-body-md">{time}</h2>
                </div>
            </div>
            <div>
                <TextLarge text={text} max={100} message="Mostrar" letter="text-primary-pri2"/>
            </div>
            <div className="flex flex-row items-center mt-4">
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon SvgIcon={Like} variant="group-hover:combColBlack2 combColBlue" />
                    <h2 className="text-body-md mr-5 group-hover:text-secondary-sec2">
                        {likes}
                    </h2>
                </div>
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon SvgIcon={Dislike} variant="group-hover:combColBlack2 combColBlue" />
                    <h2 className="text-body-md group-hover:text-secondary-sec2">
                        {dislikes}
                    </h2>
                </div>
                <Button text="Responder" variant="combColBlackBlue" />
            </div>
        </div>
    );
};
