import React, { useState } from "react";
import { useEffect } from "react";
import ButtonIcon from "../../../components/buttons/buttonIcon";
import CloseIcon from "../../../icons/close";
import Button from "../../../components/buttons/button";
import { TagSelector } from "./tag-selector";
import { useGetTable } from "../../../hooks/use-get-table";

export const ModalFilter = ({
  onClose,
  onApplyFilters,
  selectedCategories: initialCategories,
  selectedLanguages: initialLanguages,
}) => {
  const { data: categories } = useGetTable("categoria");
  const { data: languages } = useGetTable("idioma");

  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);
  const [selectedLanguages, setSelectedLanguages] = useState(initialLanguages);

  useEffect(() => {
    setSelectedCategories(initialCategories);
    setSelectedLanguages(initialLanguages);
  }, [initialCategories, initialLanguages]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((tag) => tag !== category)
        : [...prev, category]
    );
  };

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      categories: selectedCategories,
      languages: selectedLanguages,
    });
    onClose();
  };

  const handleClose = () => {
    setSelectedCategories([]);
    setSelectedLanguages([]);
    onApplyFilters({
      categories: [],
      languages: [],
    });
    onClose();
  };

  const isTagsSelects =
    selectedCategories.length > 0 || selectedLanguages.length > 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-neu1 bg-opacity-30 z-50">
      <div className="w-[560px] bg-primary-pri3 rounded-2xl p-6">
        <div className="w-full flex justify-end">
          <ButtonIcon
            onClick={handleClose}
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
                key={index}
                textTag={category.nombreCategoria}
                isSelected={selectedCategories.includes(
                  category.nombreCategoria
                )}
                onToggle={() => toggleCategory(category.nombreCategoria)}
              />
            ))}
          </div>

          <h3 className="font-title text-title-sm text-secondary-sec2 mt-4">
            Idiomas:
          </h3>
          <div className="flex flex-wrap mt-1">
            {languages?.map((language, index) => (
              <TagSelector
                key={index}
                textTag={language.idioma}
                isSelected={selectedLanguages.includes(language.idioma)}
                onToggle={() => toggleLanguage(language.idioma)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-row justify-end space-x-4 my-2 mr-3">
          <Button
            text="Filtrar"
            onClick={handleApplyFilters}
            variant={isTagsSelects ? "combCol1" : "combDesactivate"}
            disabled={!isTagsSelects}
          />
        </div>
      </div>
    </div>
  );
};
