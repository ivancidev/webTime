import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import Logo from "../../../assets/icons/logo.svg";
import BackIcon from "../../../icons/back";
import { NavbarO } from "../../../components/navbar/navbarO";


export const ForumComment = () => {
    return (
      <div className="flex max-h-screen flex-col bg-primary-pri3">
        <NavbarO/>

        <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-10 p-2 z-40">
            <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
        </div>

        <div className="flex w-full h-full">

            <div className="flex-1">
                <h1 className="text-secondary-sec2 font-title text-title-lg ml-36">
                    Comentarios del foro
                </h1>

                
                    <div className="flex justify-end relative w-1/2  max-w-[90%] bg-neutral-neu2 rounded-xl">
                        <img
                            src={Logo}
                            className="w-full rounded-3xl object-cover"
                        />
                    </div>
            

            </div>

            <div className=" flex-1 mr-28 ">
                <div className=" flex-col h-[690px] overflow-y-scroll scrollbar-hide space-y-9">
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>
            </div>
        </div>

            

      </div>
    );
  };
  
