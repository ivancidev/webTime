import { TextLarge } from "../../register/components/text-large";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Button from "../../../components/buttons/button";
import Dislike from "../../../icons/dislike";
import Like from "../../../icons/like";
import User from "../../../icons/user";


export const Comment = ({nickname,text, time, numLikes, numDislikes}) => {
    console.log(time)
    return (
        <div className="py-5 px-8 bg-primary-pri3 border border-neutral-neu1 rounded-xl w-full">
            <div className="flex flex-row items-center space-x-3">
                <ButtonIcon SvgIcon={User} variant="combColBlack2" />
                <div className="flex flex-col">
                    <h2 className="font-label text-label-md mt-1">{nickname}</h2>
                    <h2 className="text-neutral-neu0 text-body-md">{time}</h2>
                </div>
            </div>
            <div>
                <TextLarge text={text} max={100} message="Mostrar"/>
            </div>
            <div className="flex flex-row items-center mt-4">
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon SvgIcon={Like} variant="group-hover:combColBlackBlue combColBlue" />
                    <h2 className="text-body-md mr-5 group-hover:text-secondary-sec2">
                        {numLikes}
                    </h2>
                </div>
                <div className="group flex items-center hover:text-secondary-sec2">
                    <ButtonIcon SvgIcon={Dislike} variant="group-hover:combColBlackBlue combColBlue" />
                    <h2 className="text-body-md mr-5 group-hover:text-secondary-sec2">
                        {numDislikes}
                    </h2>
                </div>
                <Button text="Responder" variant="combColBlackBlue" />
            </div>
        </div>
    );
};
