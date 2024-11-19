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
    return (
      <div className="flex justify-center items-center min-h-screen bg-primary-pri3">
        <p className="text-red-500 text-lg md:text-xl">
          Ha ocurrido un error al cargar los foros
        </p>
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
