import React from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import Button from "../../../components/buttons/button";
import { TagSelector } from "./tag-selector";
export const ModalFilter = (onClose) => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50 ">
      <div className="w-[560px]  bg-primary-pri3 rounded-2xl p-6">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={onClose}
            SvgIcon={CloseIcon}
            variant="combColBlack2"
          />
        </div>
        <div className="px-6">
          <h3 className="font-title text-title-sm text-secondary-sec2">
            Categorías:
          </h3>
          <div className="flex flex-wrap mt-1">
            <TagSelector textTag="Lenguajes de programación" />
            <TagSelector textTag="Desarrollo Full-Stack" />
            <TagSelector textTag="Front-end" />
            <TagSelector textTag="Back-end" />
            <TagSelector textTag="UI/UX" />
            <TagSelector textTag="Metodologías y mejores prácticas" />
            <TagSelector textTag="Devops y despliegue" />
          </div>

          <h3 className="font-title text-title-sm text-secondary-sec2 mt-4">
            Idiomas:
          </h3>

          <div className="flex flex-wrap mt-1">
            <TagSelector textTag="Inglés" />
            <TagSelector textTag="Portugués" />
            <TagSelector textTag="Español" />
            <TagSelector textTag="Francés" />
            <TagSelector textTag="Italiano" />
          </div>
        </div>

        <div className="flex flex-row justify-end space-x-4 my-2 mr-3">
          <Button text="Filtrar" />
        </div>
      </div>
    </div>
  );
};
