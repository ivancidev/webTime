import { useState, useEffect } from "react";
import CloseIcon from "../../../icons/close";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { updateDailyStatistics } from "../../../services/streakService";
import BackIcon from "../../../icons/back";
import ContinueIcon from "../../../icons/continue";
import { supabase } from "../../../services/supabaseClient";
import Button from "../../../components/buttons/button";
import { getDate } from "../../../utils/get-date";

export const ReadBook = ({
  pdfUrl,
  onClose,
  id_user,
  limited_page,
  codBook,
}) => {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem(`pdfProgress_${pdfUrl}`)) || 1
  );
  const [iframeKey, setIframeKey] = useState(Date.now());
  const lastNotificationDate = localStorage.getItem("lastNotificationDate") || "";  
  const pdfWithParams = `${pdfUrl}#page=${currentPage}&navpanes=0&scrollbar=0&zoom=100`;
  // const today = "2024-11-13";
  const today = getDate();
  console.log("fecha", today);

  useEffect(() => {
    const initialStartTime = Date.now();

    return () => {
      const elapsedTime = Date.now() - initialStartTime;
      const totalReadingTimeInSeconds = elapsedTime / 1000;
      const totalReadingTimeInMinutes = totalReadingTimeInSeconds / 60;

      if (lastNotificationDate !== today) {
        try {
          updateDailyStatistics(id_user, totalReadingTimeInMinutes);
        } catch (error) {
          console.error(
            "Error al actualizar las estadísticas diarias en la base de datos:",
            error
          );
        }
      } else {
        updateDailyStatistics(id_user, 0);
      }
    };
  }, [id_user]);

  useEffect(() => {
    const fetchProgressFromSupabase = async () => {
      const { data, error } = await supabase
        .from("registro_leido")
        .select("pagina")
        .eq("id_usuario", id_user)
        .eq("codLibro", codBook)
        .single();

      if (data) {
        setCurrentPage(data.pagina);
      }
      if (error) {
        console.error("Error fetching progress from Supabase:", error);
      }
    };

    fetchProgressFromSupabase();
  }, [pdfUrl, id_user]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    localStorage.setItem(`pdfProgress_${pdfUrl}`, page);

    const { error } = await supabase
      .from("registro_leido")
      .upsert(
        { id_usuario: id_user, codLibro: codBook, pagina: page },
        { onConflict: ["id_usuario", "codLibro"] }
      );

    if (error) {
      console.error("Error saving progress to Supabase:", error);
    }

    setIframeKey(Date.now());
  };

  const handleResetProgress = async () => {
    const { error } = await supabase
      .from("registro_leido")
      .upsert(
        { id_usuario: id_user, codLibro: codBook, pagina: 1 },
        { onConflict: ["id_usuario", "codLibro"] }
      );

    if (error) {
      console.error("Error resetting progress in Supabase:", error);
    } else {
      setCurrentPage(2);
      localStorage.setItem(`pdfProgress_${pdfUrl}`, 1);
      setIframeKey(Date.now());
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < limited_page) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="flex justify-end p-3 md:p-6">
        <ButtonIcon SvgIcon={CloseIcon} variant="combColZ" onClick={onClose} />
      </div>
      <div className="relative rounded-lg shadow-lg overflow-hidden w-full max-w-3xl md:w-[70%] md:max-w-none mx-auto md:mb-5">
        <iframe
          src={pdfWithParams}
          title="PDF"
          className="w-full h-screen md:h-[80vh] border-none"
          style={{ display: "block" }}
          key={iframeKey}
        />
      </div>
      <div className="flex justify-center space-x-4 p-4">
        <div className="flex items-center bg-transparent rounded-3xl p-2">
          <ButtonIcon
            SvgIcon={BackIcon}
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          />
        </div>
        <div className="flex items-center bg-transparent rounded-3xl p-2">
          <Button
            text="Reiniciar"
            onClick={handleResetProgress}
            variant="combCol2"
          />
        </div>
        <div className="flex items-center bg-transparent rounded-3xl p-2">
          <ButtonIcon
            SvgIcon={ContinueIcon}
            onClick={goToNextPage}
            disabled={currentPage >= limited_page}
          />
        </div>
      </div>
    </div>
  );
};
