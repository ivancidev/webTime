import Button from "../../../components/buttons/button";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import { Dropdown } from "../../../components/dropdown/dropdown";
import CloseIcon from "../../../icons/close";
import { useGetTable } from "../../../hooks/use-get-table";

export const ModalStreak = ({ daysStreak, time, onClose }) => {
  const { data: times } = useGetTable("tiempos_lectura");
  const contentTime = time + " minutos";
  return (
    <div className="w-[530px] h-60 rounded-xl bg-primary-pri3 drop-shadow-lg p-2 absolute top-20 right-2">
      <div className="w-full flex justify-end">
        <ButtonIcon
          onClick={onClose}
          SvgIcon={CloseIcon}
          variant="combColBlack2"
        />
      </div>
      <div className="flex flex-col space-y-7 px-8">
        <div>
          <div className="flex flex-row items-center">
            <h3 className="font-title text-title-sm">Días en racha: </h3>
            <h2 className="font-body text-body-lg pl-2">{daysStreak}</h2>
          </div>
          <div className="flex flex-row pl-4 mt-3">
            <h4 className="font-label text-label-md">
              Tiempo diario establecido:
            </h4>
            <p className="font-body text-body-md pl-1">{contentTime}</p>
          </div>
        </div>
        <div>
          <h3 className="font-title text-title-sm">Cambiar tiempo diario: </h3>
          <div className="flex flex-row mt-4 items-center justify-between">
            <Dropdown
              name="time"
              options={times}
              placeholder="Seleccionar tiempo"
              valueKey="id_tiempo_lectura"
              displayKey="minutos"
              onChange={(e) => setValue("time", e.target.value)}
            />
            <Button text="Cambiar" />
          </div>
        </div>
      </div>
    </div>
  );
};
