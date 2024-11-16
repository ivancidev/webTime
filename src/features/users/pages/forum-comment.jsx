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
            <h1 className="flex justify-start text-secondary-sec2 font-title text-title-lg mx-28">
                Comentarios del foro
            </h1>
        <div className="flex flex-row mx-14 my-10">
            <div className="flex justify-end relative w-2/5 max-w-[90%] bg-neutral-neu2 rounded-xl">
                <img
                    src={Logo}
                    className="w-full rounded-3xl object-cover"
                />
            </div>
            <div className="flex w-3/5 flex-row ml-14">
                <Comment/>
            </div>
        </div>
      </div>
    );
  };
  
