
import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";

const EmailSentModal = ({ onClose, email }) => {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50"
      onClick={onClose}
    >
      <div
        className="w-[95%] h-[230px] sm:w-[500px] sm:h-[220px] bg-primary-pri3 rounded-xl shadow-lg"
      >
        <div className="w-full flex justify-end p-1">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-sm sm:text-title-md mx-5">
            Correo electrónico enviado
          </h1>
          <h1 className="text-center font-body text-body-sm text-neutral-neu0 w-[85%] sm:w-auto mt-5 mx-5 sm:mx-10">
            Hemos enviado un correo electrónico a {email}. Si el correo
            electrónico ingresado es válido, existente y está asociado a una
            cuenta de Webtime, recibirás un correo electrónico en tu bandeja de
            entrada para restablecer tu contraseña.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EmailSentModal;
