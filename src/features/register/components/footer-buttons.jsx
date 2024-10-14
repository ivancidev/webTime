import React from "react";
import ContinueIcon from "../../../icons/continue";
import CancelIcon from "../../../icons/cancel"; // 
import Button from "../../../components/Buttons/Button";

export default function FooterButtons({ handleSubmit, onSubmit }) {
  const handleUpload = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <footer className="flex w-full justify-end gap-4 mx-auto p-14">
      <Button
        text="Cancelar" 
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

