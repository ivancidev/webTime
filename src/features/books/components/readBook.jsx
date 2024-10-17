import React from "react";
import CloseIcon from "../../../icons/close";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const ReadBook = ({ pdfUrl, onClose }) => {
  const pdfWithParams = `${pdfUrl}#navpanes=0&scrollbar=0&zoom=100`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="flex justify-end p-2 md:p-6">
        <ButtonIcon
          SvgIcon={CloseIcon}
          variant="combColTrans"
          onClick={onClose}
        />
      </div>

      <div className="relative rounded-lg shadow-lg overflow-hidden w-full max-w-3xl md:w-[70%] md:max-w-none mx-auto">
        <iframe
          src={pdfWithParams}
          title="PDF"
          className="w-full h-screen md:h-[80vh] border-none"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
};
