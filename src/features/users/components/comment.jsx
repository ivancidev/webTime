import { TextLarge } from "../../register/components/text-large";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import Button from "../../../components/buttons/button";
import Dislike from "../../../icons/dislike";
import Like from "../../../icons/like";
import User from "../../../icons/user";

export const Comment = () => {
    const text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.";

    return (
        <div className="p-4 bg-primary-pri3 border border-[#AEAAAE] rounded-xl">
            <div className="flex flex-row items-center space-x-3">
                <ButtonIcon SvgIcon={User} variant="combColBlack2" />
                <div className="flex flex-col">
                    <h2 className="font-label text-label-md mt-1">Jhon Smith</h2>
                    <h2 className="text-neutral-neu0 text-body-md mt-1">2 horas</h2>
                </div>
            </div>
            <div className="mt-4">
                <TextLarge sinopsis={text} />
            </div>
            <div className="flex flex-row items-center space-x-2 mt-4">
                <ButtonIcon SvgIcon={Like} variant="combColBlack2" />
                <ButtonIcon SvgIcon={Dislike} variant="combColBlack2" />
                <Button text="Responder" variant="combColBlackBlue" />
            </div>
        </div>
    );
};
