import React from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { InputText } from "../../../components/input/input";

const ResetPasswordModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[550px] h-[320px] bg-primary-pri3 rounded-xl shadow-lg">
        <div className="w-full flex justify-end p-1">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="bg-gradient-to-r from-secondary-sec3 via-secondary-sec1 to-secondary-sec2 bg-clip-text text-transparent w-auto font-title text-title-md">
            Restablece tu contraseña
          </h1>
          <h1 className="text-center font-body text-body-sm text-neutral-neu0 w-auto mt-3 mx-10">
            Introduce el correo electrónico asociado a tu cuenta de WebTime y te enviaremos un correo con un enlace para restaurar tu contraseña
          </h1>
          <div className="mb-3">
            <InputText 
              labelMarginTop="10px"
              labelFontSize="16px"
              label="¿Cuál es tu correo electrónico?"
              placeholder="Ingrese su correo electrónico"
              className="w-[95%] sm:w-96 bg-transparent border-[1px] rounded border-neutral-neu0 h-[40px] p-2 placeholder-neutral-neu0 text-primary-pri1 font-body text-body-md"
            />
          </div>
          <Button
            text="Enviar correo de restablecimiento de contraseña"
            variant="combExp"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;