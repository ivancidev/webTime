import { useEffect, useState } from "react";
import { useUserDetails } from "../../hooks/use-user-details";
import { updateEst } from "../../services/update-estadist";
import { updateRacha } from "../../services/update-streak";
import { NotificationStreak } from "../../features/users/components/notification-streak";
import { useGetEstadistics } from "../../hooks/use-get-estadistics";

export const ShowStreak = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { userDetails } = useUserDetails(user);
  const { useEstadistics } = useGetEstadistics(user);
  const storedRacha = localStorage.getItem("diasRacha");
  const initialRacha = storedRacha
    ? parseInt(storedRacha, 10)
    : userDetails
    ? userDetails.dias_racha
    : 0;

  const [previousRacha, setPreviousRacha] = useState(
    userDetails?.dias_racha || 0
  );
  const [showStreakNotification, setShowStreakNotification] = useState(false);
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    const lastNotificationDate =
      localStorage.getItem("lastNotificationDate") || "";

    const resetDailyProgress = () => {
      if (useEstadistics.minutos_aprendido_hoy < userDetails.minutos) {
        updateRacha(user.id_usuario, userDetails.id_racha, 0);
        setPreviousRacha(0);
        setShowStreakNotification(true);
        setActivate(false);
      }

      updateEst(user.id_usuario, useEstadistics.id_metrica, false, 0);
    };

    const checkDailyProgress = () => {
      const currentTime = new Date();
      const isEndOfDay =
        currentTime.getHours() === 23 && currentTime.getMinutes() === 59;

      if (isEndOfDay) {
        resetDailyProgress();
      }
    };

    if (userDetails && useEstadistics) {
      const cumpleTiempoLectura =
        useEstadistics.minutos_aprendido_hoy >= userDetails.minutos;
      const lastDate = new Date(lastNotificationDate);
      const estadisticsDate = new Date(useEstadistics.fecha);
      const differenceInDays = Math.floor(
        (estadisticsDate - lastDate) / (1000 * 60 * 60 * 24)
      );

      if (differenceInDays >= 2) {
        updateRacha(user.id_usuario, userDetails.id_racha, 0);
        localStorage.setItem("diasRacha", 0);
        localStorage.setItem("lastNotificationDate", useEstadistics.fecha);
        setShowStreakNotification(true);
        return;
      }

      if (
        cumpleTiempoLectura &&
        lastNotificationDate !== useEstadistics.fecha
      ) {
        const diasRacha = userDetails.dias_racha + 1;
        localStorage.setItem("diasRacha", diasRacha);
        setPreviousRacha(diasRacha);
        updateRacha(user.id_usuario, userDetails.id_racha, diasRacha);
        updateEst(
          user.id_usuario,
          useEstadistics.id_metrica,
          true,
          0

        );
        setShowStreakNotification(true);
        localStorage.setItem("lastNotificationDate", useEstadistics.fecha);
      }

      setActivate(cumpleTiempoLectura);
    }

    const intervalId = setInterval(checkDailyProgress, 60000);

    return () => clearInterval(intervalId);
  }, [userDetails, useEstadistics, user.id_usuario, previousRacha]);

  const resetNotification = () => {
    setShowStreakNotification(false);
  };

  return (
    <>
      {showStreakNotification && (
        <NotificationStreak
          day={initialRacha}
          onClose={resetNotification}
          activate={activate}
        />
      )}
    </>
  );
};
