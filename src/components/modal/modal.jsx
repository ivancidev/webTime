import React from "react";
import Button from "../Buttons/Button";
import ButtonIcon from "../Buttons/buttonIcon";
import CloseIcon from "../../icons/close";

const Modal = ({ 
  onClose,
  text,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50 ">
      <div className="w-96 h-auto bg-primary-pri3 rounded-xl p-6">
        {/* <div className="w-full flex justify-end">
          <ButtonIcon SvgIcon={CloseIcon} variant="combColTrans" />
        </div> */}

        <p className="font-body text-body-lg text-primary-pri1 p-2">
          {text}
        </p>
        <div className="flex flex-row justify-end space-x-4 mt-6 mb-2">
          <Button onClick={onClose} text="Cancelar" variant="combCol2" />
          <Button onClick={onConfirm} text="Confirmar" />
        </div>
      </div>
    </div>
  );
};

export default Modal;