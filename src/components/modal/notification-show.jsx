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
    const lastNotificationDate = localStorage.getItem("lastNotificationDate");
    const today = new Date().toISOString().split("T")[0];

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

      if (cumpleTiempoLectura && lastNotificationDate !== today) {
        const diasRacha = userDetails.dias_racha + 1;
        localStorage.setItem("diasRacha", diasRacha);
        setPreviousRacha(diasRacha);
        updateRacha(user.id_usuario, userDetails.id_racha, diasRacha);
        updateEst(
          user.id_usuario,
          useEstadistics.id_metrica,
          true,
          useEstadistics.minutos_aprendido_hoy
        );
        setShowStreakNotification(true);
        localStorage.setItem("lastNotificationDate", today);
      }

      setActivate(cumpleTiempoLectura);
    }

    const intervalId = setInterval(checkDailyProgress, 60000);

    return () => clearInterval(intervalId);
  }, [userDetails, useEstadistics, user.id_usuario, previousRacha]);

  const resetNotification = () => {
    setShowStreakNotification(false);
  };
  console.log(userDetails);
  console.log(useEstadistics);

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
