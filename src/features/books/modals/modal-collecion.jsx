import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import { CardAddCollection } from "../components/card-collection";

export const ModalCollection = ({ onClose, text, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50 ">
      <div className="w-[521px] h-auto bg-primary-pri3 rounded-xl p-6">
        <div className="w-full flex items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-secondary-sec2 w-auto text-center text-title-md font-semibold">
              {text}
            </h1>
          </div>
          <div className="flex justify-end">
            <ButtonIcon
              onClick={onClose}
              SvgIcon={CloseIcon}
              variant="combColBlack2"
            />
          </div>
        </div>
        <CardAddCollection />
      </div>
    </div>
  );
};
