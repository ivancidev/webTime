import React, { useState } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import Button from "../../../components/buttons/button";
import { TagSelector } from "./tag-selector";
import { useGetTable } from "../../../hooks/use-get-table";

export const ModalFilter = ({ onClose, onApplyFilters }) => {
  const { data: categories } = useGetTable("categoria");
  const { data: languages } = useGetTable("idioma");
  const [selectedTags, setSelectedTags] = useState([]); // Estado para las etiquetas seleccionadas

  const toggleTag = (category) => {
    setSelectedTags((prev) =>
      prev.includes(category)
        ? prev.filter((tag) => tag !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedTags); // Pasar las categorías seleccionadas al componente padre
    onClose(); // Cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[560px] bg-primary-pri3 rounded-2xl p-6">
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
            {categories?.map((category, index) => (
              <TagSelector
                key={index} // Asumimos que cada categoría tiene un ID único
                textTag={category.nombreCategoria}
                isSelected={selectedTags.includes(category.nombreCategoria)} // Comprobar si la categoría está seleccionada
                onToggle={() => toggleTag(category.nombreCategoria)} // Manejador de clic
              />
            ))}
          </div>

          <h3 className="font-title text-title-sm text-secondary-sec2 mt-4">
            Idiomas:
          </h3>
          <div className="flex flex-wrap mt-1">
            {languages?.map((language, index) => (
              <TagSelector key={index} textTag={language.idioma} />
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-end space-x-4 my-2 mr-3">
          <Button text="Filtrar" onClick={handleApplyFilters} />{" "}
          {/* Asignar la función al botón */}
        </div>
      </div>
    </div>
  );
};
