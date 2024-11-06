import { useState, useEffect } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import FireLargeAct from "../../../icons/fireLargeAct";
import FireLargeNoAct from "../../../icons/fireLargeNoAct";

export const NotificationStreak = ({ day, isAccom, onClose }) => {
  const motivationalMessages = [
    "¡Sigue así! Tu racha está imparable.",
    "¡Racha activa! No te detengas.",
    "¡No pares ahora! Racha en aumento.",
    "¡Increíble! Mantén el impulso.",
    "¡Buen trabajo! Un día más en tu racha.",
    "La constancia es clave. ¡Mantén tu racha!",
  ];

  const [textMotivation, setTextMotivation] = useState("");

  useEffect(() => {
    if (isAccom) {
      const randomMessage =
        motivationalMessages[
          Math.floor(Math.random() * motivationalMessages.length)
        ];
      setTextMotivation(randomMessage);
    } else {
      setTextMotivation("");
    }
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-56 bg-primary-pri3 rounded-2xl p-2 flex flex-col items-center text-center">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        {isAccom ? (
          <>
            <FireLargeAct />
            <div className="flex flex-row  items-center mt-4 space-x-1">
              <h2 className="font-title text-title-sm  text-primary-pri2">
                ¡Racha de
              </h2>
              <h3 className="font-display text-display-sm  text-secondary-sec2">
                {day}
              </h3>
              <h2 className="font-title text-title-sm text-primary-pri2">
                días!
              </h2>
            </div>

            <p className="font-body text-body-md text-neutral-neu0 mt-1 px-2 mb-5">
              {textMotivation}
            </p>
          </>
        ) : (
          <>
            <FireLargeNoAct />
            <h2 className="font-title text-title-sm mt-4 text-primary-pri2">
              Oh, no. Perdiste tu racha
            </h2>
            <p className="font-body text-body-md text-neutral-neu0 mt-1 px-2 mb-5">
              ¡Ánimo! A veces fallamos, pero cada día es una nueva oportunidad.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
