import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import LogOut from "../../../icons/logOut";
import UserProf from "../../../icons/userProfile";
import ViewProfile from "../../../icons/viewProfile";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ModalUser = ({ nickname, imgUser, onClose }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("user");
    localStorage.removeItem("diasRacha")
    localStorage.removeItem("lastNotificationDate");
    navigate("/");
  };

  const location = useLocation();

  const handleViewProfile = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <div className="p-4 bg-primary-pri3 drop-shadow-xl rounded-xl w-[180px]">
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
        {location.pathname !== "/profile" && (
          <Button
            text="Ver perfil"
            variant="combSize"
            SvgIcon={ViewProfile}
            onClick={handleViewProfile}
          />
        )}
        <Button
          text="Cerrar sesión"
          variant="combSize"
          SvgIcon={LogOut}
          onClick={logOut}
        />
      </div>
    </div>
  );
};
