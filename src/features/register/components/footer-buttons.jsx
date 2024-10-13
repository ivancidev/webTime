import React from "react";
import ContinueIcon from "../../../icons/continue";
import CancelIcon from "../../../icons/cancel"; // Agrega esta línea
import Button from "../../../components/buttons/button";

export default function FooterButtons({ handleSubmit, onSubmit }) {
  const handleUpload = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <footer className="flex w-full justify-end gap-4 mx-auto p-14">
      <Button
        text="Cancelar" // Agrega este bloque
        variant="combCol2" 
        SvgIcon={CancelIcon} 
      /> 
      <Button
        text="Continuar"
        variant="combCol1"
        SvgIcon={ContinueIcon}
        onClick={handleUpload}
      />
    </footer>
  );
}

