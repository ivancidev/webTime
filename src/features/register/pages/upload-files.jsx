import React from "react";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import ImagePre from "../../../icons/imgPreview";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import Button from "../../../components/buttons/button";
export const Files = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex flex-col justify-center items-center gap-10">
        <Card title="Imagen de portada" SVG={FrontIcon} ImageSVG={ImagePre} />
        <Card title="Archivo PDF" SVG={TextIcon} ImageSVG={ImagePre} />
        <Card title="Archivo de audio" SVG={AudioIcon} />
      </section>
      <div className="flex w-full justify-end gap-4 mx-auto p-14">
        <Button text="Cancelar" variant="combCol2" SvgIcon={CancelIcon} />
        <Button text="Subir archivos" variant="combCol1" SvgIcon={UploadIcon} />
      </div>
    </div>
  );
};
