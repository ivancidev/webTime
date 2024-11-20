import React from "react";
import CancelIcon from "../../../icons/cancel"; //
import Button from "../../../components/buttons/button";
import CheckS from "../../../icons/checkSmall";

export default function FooterButtonsCol({ handleSubmit, onSubmit, onCancel }) {
  const handleUpload = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <footer className="flex w-full justify-end gap-4 mx-auto px-14 py-10">
      <Button
        text="Cancelar"
        variant="combCol2"
        SvgIcon={CancelIcon}
        onClick={onCancel}
      />
      <Button
        text="Crear"
        variant="combCol1"
        SvgIcon={CheckS}
        onClick={onSubmit}
      />
    </footer>
  );
}
