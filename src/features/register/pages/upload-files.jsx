import React from "react";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import ImagePre from "../../../icons/imgPreview";
import { Button } from "../../../components/buttons/button";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
export const Files = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex flex-col justify-center items-center">
        <Card title="Imagen de portada" icon={FrontIcon} image={ImagePre} />
        <Card title="Archivo PDF" icon={TextIcon} image={ImagePre} />
        <Card title="Archivo de audio" icon={AudioIcon} />
      </section>
      <div className="flex w-full justify-end gap-4 mx-auto p-14">
        <Button text="Cancelar" variant="combCol2" SvgIcon={CancelIcon} />
        <Button text="Subir archivos" variant="combCol1" SvgIcon={UploadIcon} />
      </div>
    </div>
  );
};
