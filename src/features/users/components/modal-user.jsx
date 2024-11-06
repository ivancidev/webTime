import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import LogOut from "../../../icons/logOut";
import UserProf from "../../../icons/userProfile";
import ViewProfile from "../../../icons/viewProfile";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";

export const ModalUser = ({ nickname, imgUser, onClose }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("user");
    navigate("/");
  };
  const location = useLocation();
  const handleClickOutside = (e) => {
    // Cierra el modal si el clic fue en el fondo (fuera del contenido del modal)
    if (e.target.id === "modal-background") {
      onClose();
    }
  };
  
  return (
    <div
      id="modal-background"
      className="fixed inset-0 flex items-start justify-end "
      onClick={handleClickOutside}
    >
      <div className="p-4 bg-primary-pri3 drop-shadow-xl rounded-xl"
        
      >
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
          <h3 className="font-label text-label-lg py-1">{nickname}</h3>
          {location.pathname !== "/profile" && <Button
            text="Ver perfil"
            variant="combSize"
            SvgIcon={ViewProfile}
            onClick={() => navigate("/profile")}
            
          />}
          <Button
            text="Cerrar sesión"
            variant="combSize"
            SvgIcon={LogOut}
            onClick={logOut}
          />
        </div>
      </div>  
    </div>
    
  );
};
