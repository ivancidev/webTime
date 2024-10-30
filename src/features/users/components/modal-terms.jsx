import React from "react";
import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";

const TermsModal = ({ onClose, onConfirm }) => {
  const termsText = `
  `;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-3/4 md:w-3/5 max-h-[80vh] bg-primary-pri3 rounded-xl p-6 overflow-y-auto">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>

        <h2 className="font-body text-body-md font-bold text-primary-pri1 p-2">Términos y Condiciones</h2>
        <p className="font-body text-body-sm text-primary-pri1 p-2 whitespace-pre-line">
          {termsText}
        </p>
      </div>
    </div>
  );
};

export default TermsModal;
