import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/button";
import CheckS from "../../../icons/checkSmall";
import Preferences from "../components/preferences";
import { useGetTable } from "../../../hooks/use-get-table";
import { Navbar } from "../../register/components/navbar";

export const SelectPreferences = () => {
  const { data: categories } = useGetTable("categoria");
  const { data: times } = useGetTable("tiempos_lectura");
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handleSelect = (text, isSelected) => {
    setSelectedPreferences((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, text];
        a;
      } else {
        return prevSelected.filter((item) => item !== text);
      }
    });
  };
  const onSubmit = () => {
    navigate("/", { state: { selectedPreferences } });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col ">
        <Preferences
          text="Elige las categorias de tu interés"
          icons={categories}
          variant="c"
          onSelect={handleSelect}
        />
        <Preferences
          text="Tiempo de lectura preferido"
          icons={times}
          variant="t"
          onSelect={handleSelect}
        />
      </div>
      <div className="flex flex-row max-w-full justify-end mx-5 md:mx-16 lg:mx-36 py-8 md:pb-10">
        <Button SvgIcon={CheckS} text="Aplicar" onClick={onSubmit} />
      </div>
    </div>
  );
};
