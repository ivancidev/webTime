import React from "react";
import CloseIcon from "../../../icons/close";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const ReadBook = ({ pdfUrl, onClose }) => {
  const pdfWithParams = `${pdfUrl}#navpanes=0&scrollbar=0&zoom=100`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="relative rounded-lg shadow-lg overflow-hidden w-full max-w-3xl sm:w-[70%] sm:max-w-none mx-auto">
        <iframe
          src={pdfWithParams}
          title="PDF"
          className="w-full h-[70vh] sm:h-[80vh] border-none"
          style={{ display: "block" }}
        />
      </div>
      <div className="flex justify-start items-start min-h-screen p-6">
        <ButtonIcon
          SvgIcon={CloseIcon}
          variant="combColTrans"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
