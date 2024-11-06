import { Streak } from "../../../icons/streak";

export const DailyStreak = ({ days }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center">
        <Streak />
        <h2 className="font-title text-title-md ml-3">Racha diaria</h2>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center border-2 border-secondary-sec2 rounded-full w-20 h-20 mt-2">
          <div className="flex flex-col items-center">
            <h2 className="font-body text-secondary-sec2 text-title-md font-bold">
              {days}
            </h2>
            <p className="font-label text-label-md">
              {days === 1 ? "Día" : "Días"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
