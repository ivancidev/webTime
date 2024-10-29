import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../../components/buttons/buttonIcon"
import { NavbarO } from "../../../components/navbar/navbarO"
import BackIcon from "../../../icons/back"
import { PerfilUser } from "../components/perfil-user";
import Fire from "../../../icons/fire";



export const Profile = () => {
    const navigate = useNavigate();
    //hardocdeo por el momento no? 

    return (
        <div>
            <NavbarO/>
            <div className="">
                <div className="ml-14 mt-8">
                    <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/")} />
                </div>
                <div className="grid grid-cols-2 ml-[150px] mt-2">
                    <div>
                        <PerfilUser/>
                    </div>
                    <div>
                        {/*<Fire/> ya esta el fueguito*/}
                    </div>
                </div>
            </div>

        </div>
    )
}

