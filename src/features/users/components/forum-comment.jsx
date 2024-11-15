import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import LogOut from "../../../icons/logOut";
import ViewProfile from "../../../icons/viewProfile";
import Like from "../../../icons/like";
import Dislike from "../../../icons/dislike";
import { TextLarge } from "../../register/components/text-large";

export const Comment = () => {

  return (
    <div className="p-4 bg-primary-pri3 bore rounded-xl ">
        <div className="flex flex-row">
            <ButtonIcon
                SvgIcon={User}
                variant="combColBlack2"
            />
            <div className="flex flex-col">
                <h2 className="font-label text-label-md mt-1">Jhon Smith</h2>
                <h2 className="text-neutral-neu0 text-body-md mt-1">2horas</h2>
            </div>
        </div>
        <div>
            <TextLarge>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</TextLarge>
        </div>
        <div className="flex flex-row">
            <ButtonIcon
                SvgIcon={Like}
                variant={`${isOpenUser ? "combColBlue" : "combColBlack2"}`}
            /><ButtonIcon
                SvgIcon={Dislike}
                variant={`${isOpenUser ? "combColBlue" : "combColBlack2"}`}
            /><Button
                text="Responder"
                variant="combColBlackBlue"
            />
        </div>
    </div>
  );
};
