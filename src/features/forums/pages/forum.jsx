import { CircularProgress } from "@mui/material";
import { transformData } from "../../../utils/transform-data";
import { SectionWithCards } from "../sections/section-with-cards";
import { useQuery } from "@tanstack/react-query";
import { forumsService } from "../../../services/forums-service";

export const Forum = () => {
  const {
    data: forums,
    isLoading: isLoadingForo,
    isError: isErrorForo,
  } = useQuery(["forums"], forumsService);

  if (isLoadingForo) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
        <CircularProgress color="primary" size={100} />
        <h2 className="mt-4 text-lg md:text-xl">Cargando foros...</h2>
      </div>
    );
  }
  if (isErrorForo) {
    const errorMessage ="La sección de foros no está disponible en este momento";

        return (
          <div className="flex flex-col justify-center items-center min-h-screen bg-primary-pri3">
            <p className="text-red-500 text-lg md:text-xl text-center">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-secondary-sec3 text-neutral-neu1 rounded-lg hover:bg-secondary-sec2"
            >
              Recargar
            </button>
          </div>
        );
      }


  const sectionForums = transformData(forums);

  return (
    <>
      {sectionForums.map((secion, index) => (
        <SectionWithCards
          key={index}
          category={secion.title}
          cards={secion.cards}
        />
      ))}
    </>
  );
};
