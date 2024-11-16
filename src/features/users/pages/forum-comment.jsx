import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Comment } from "../components/comment";
import Logo from "../../../assets/icons/logo.svg";
import BackIcon from "../../../icons/back";
import { NavbarO } from "../../../components/navbar/navbarO";


export const ForumComment = (id, img) => {
    //img solo prueba, despues borrar 
    img = "https://i1.sndcdn.com/avatars-000329607942-t9hnvm-t240x240.jpg"
    return (
      <div className="flex max-h-screen flex-col bg-primary-pri3">
        <NavbarO/>

        <div className="sticky top-0 sm:relative flex items-center bg-transparent rounded-3xl ml-2 sm:ml-10 p-2 z-40">
            <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate(-1)} />
        </div>

        <div className="flex w-full h-full">

            <div className="flex-1">
                <h1 className="text-secondary-sec2 font-title text-title-lg text-center">
                    Comentarios del foro
                </h1>
                
                <img
                    src={img}
                    className="mx-auto mt-10 rounded-3xl object-cover w-2/3"
                />
                   
            

            </div>

            <div className=" flex-1">
                <div className=" flex-col h-[690px] overflow-y-scroll space-y-9 pr-[75px]">
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
  
