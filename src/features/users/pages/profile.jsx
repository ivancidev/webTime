import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon"
import { NavbarO } from "../../../components/navbar/navbarO"
import BackIcon from "../../../icons/back"

export const Profile = () => {
    const navigate = useNavigate();
    const d = 2;
    return (
        <div>
            <NavbarO/>
            <div className="">
                <div className="ml-14 mt-8">
                    <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/")} />
                </div>
                <div className="grid-cols-2 ml-[150px] mt-2">
                    <div>
                        <h1 className="text-secondary-sec2 font-title text-title-lg">Perfil de usuario</h1>
                        <div className="mt-8 ml-8 flex flex-row">
                            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                                <img src="/src/assets/images/userDefault.jpg" alt="Imagen de perfil" class="w-full h-full object-cover"/>
                            </div>
                            <div className="ml-[70px]">
                                <h2 className="font-title text-title-md mt-1">nombre_completo</h2>
                                <h2 className="font-label text-label-lg mt-3">nickname</h2>
                                <h2 className="font-label text-label-lg mt-2">correoelectronico@gmail.com</h2>
                            
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}