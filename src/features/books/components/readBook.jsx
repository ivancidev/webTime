import React, { useState, useEffect } from "react";
import CloseIcon from "../../../icons/close";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { updateDailyStatistics } from '../../../services/streakService';

export const ReadBook = ({ pdfUrl, onClose, id_user }) => {
  const [startTime, setStartTime] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  const pdfWithParams = `${pdfUrl}#navpanes=0&scrollbar=0&zoom=100`;

  useEffect(() => {
    setStartTime(Date.now());

    return () => {
      if (startTime) {
        const elapsedTime = Date.now() - startTime;
        const totalReadingTimeInSeconds = (readingTime + elapsedTime) / 1000;
        const totalReadingTimeInMinutes = totalReadingTimeInSeconds / 60;

        try {
          updateDailyStatistics(id_user, totalReadingTimeInMinutes);
        } catch (error) {
          console.error('Error al actualizar las estadísticas diarias en la base de datos:', error);
        }
      }
    };
  }, [id_user, readingTime, startTime]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="flex justify-end p-3 md:p-6">
        <ButtonIcon
          SvgIcon={CloseIcon}
          variant="combColZ"
          onClick={onClose}
        />
      </div>
      <div className="relative rounded-lg shadow-lg overflow-hidden w-full max-w-3xl md:w-[70%] md:max-w-none mx-auto md:mb-5">
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
