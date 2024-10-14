import React from "react";
import ContinueIcon from "../../../icons/continue";
import CancelIcon from "../../../icons/cancel"; 
import Button from "../../../components/Buttons/Button";

export default function FooterButtons({ handleSubmit, onSubmit, onCancel }) {
  const handleUpload = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <footer className="flex w-full justify-end gap-4 mx-auto p-14">
      <Button
        text="Cancelar" 
        variant="combCol2" 
        SvgIcon={CancelIcon}
        onClick={onCancel} // Añadir la función onCancel aquí
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
