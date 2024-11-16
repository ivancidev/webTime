import React from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";

const ResetPasswordModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="relative w-full sm:w-3/4 md:w-3/5 h-screen sm:max-h-[80vh] bg-primary-pri3 rounded-xl shadow-lg">
        <div className="sticky top-0 w-full flex justify-end p-2 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 bg-combColBlack2 rounded-full flex items-center justify-center hover:bg-opacity-80"
          >
            <CloseIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[87%] sm:max-h-[70vh]">
          <h2 className="font-body text-body-md font-bold text-primary-pri1 px-2">Términos y Condiciones</h2>
          <p className="font-body text-body-sm text-primary-pri1 p-2 whitespace-pre-line">
            hola
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;