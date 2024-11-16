import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import Logo from "../../../assets/icons/logo.svg";
import BackIcon from "../../../icons/back";

export const ForumComment = () => {
  return (
    <div className="flex max-h-screen flex-col bg-primary-pri3">
        <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-8 p-2 z-40">
            <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
        </div>
        <div className="flex flex-row items-center px-14">
            <div className="flex justify-center items-center flex-col w-1/3">
                <h1 className="text-secondary-sec2 font-title text-title-lg">
                    Comentarios del foro
                </h1>
                <div className="relative w-full max-w-[90%] bg-neutral-neu2 rounded-3xl mb-0 md:mb-10">
                    <img
                        src={Logo}
                        className="w-full rounded-3xl absolute inset-0 m-auto object-cover"
                    />
                </div>
            </div>
            <div className="flex w-2/3 flex-row m-14">
                <Comment/>
            </div>
        </div>
    </div>
  );
};
