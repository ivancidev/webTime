import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import LogOut from "../../../icons/logOut";
import UserProf from "../../../icons/userProfile";
import ViewProfile from "../../../icons/viewProfile";
import { useNavigate } from 'react-router-dom';

export const ModalUser = ({ codUser, nickname, imgUser, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="w-52 h-[272px] rounded-xl border-[1px] border-primary-pri2 bg-primary-pri3 drop-shadow-lg">
      <div className="w-full flex justify-end">
        <ButtonIcon
          onClick={onClose}
          SvgIcon={CloseIcon}
          variant="combColBlack2"
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        {imgUser ? (
          <img 
            src={imgUser}
            className="w-[92px] h-[92px] object-cover rounded-full"
          />
        ) : (
          <UserProf />
        )}
        <h3 className="font-label text-label-lg">{nickname}</h3>
        <Button text="Ver perfil" variant="combSize" SvgIcon={ViewProfile} onClick={() => navigate("/profile")}/>
        <Button text="Cerrar sesión" variant="combSize" SvgIcon={LogOut} onClick={() => navigate("/")}/>
      </div>
    </div>
  );
};
