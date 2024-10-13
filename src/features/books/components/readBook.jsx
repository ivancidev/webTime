import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";

export const ReadBook = ({ pdfBook }) => {
  const pdfWithParams = `${pdfBook}#navpanes=0&scrollbar=0&zoom=100`;
  return (
    <div className="fixed inset-0 mt-20 bg-white z-50 flex flex-col justify-center items-center">
      <ButtonIcon SvgIcon={CloseIcon} variant="combColZ" />

      <iframe
        src={pdfWithParams}
        title="PDF"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};
