import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import ImagePre from "../../../icons/imgPreview";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import Button from "../../../components/buttons/button";
import BackIcon from "../../../icons/back";
import { Link, useLocation } from "react-router-dom";

export const Files = () => {
  const location = useLocation();
  const { state } = location;

  const { register, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm();

  const [files, setFiles] = useState({
    coverImage: null,
    pdfFile: null,
    audioFile: null,
  });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleRemoveFile = (fileType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileType]: null,
    }));

    // Limpiar el valor del input del archivo en el formulario
    setValue(fileType, null);
    clearErrors(fileType); // Limpiar los errores de validación del archivo removido
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("archivoPDF", files.pdfFile);
    formData.append("archivoAudio", files.audioFile);
    formData.append("archivoPortada", files.coverImage);
    
    if (state) {
      formData.append("nombreLibro", state.title);
      formData.append("sinopsis", state.synopsis);
      formData.append("codAutor", state.author);
      formData.append("codCategoria", state.category);
      formData.append("codIdioma", state.language);
    }

    try {
      const response = await fetch("http://localhost:4000/subirLibro", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Archivos subidos correctamente.");
      } else {
        alert("Error al subir los archivos.");
      }
    } catch (error) {
      alert("Error al subir los archivos.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex items-center p-2">
        <Link to="/">
          <BackIcon className="cursor-pointer" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-4">
        <Card
          title="Imagen de portada"
          SVG={FrontIcon}
          ImageSVG={ImagePre}
          register={register("coverImage", { required: "La imagen de portada es obligatoria." })}
          error={errors.coverImage}
          fileType="image"
          onFileChange={handleFileChange}
          onRemoveFile={() => handleRemoveFile("coverImage")}
        />
        <Card
          title="Archivo PDF"
          SVG={TextIcon}
          ImageSVG={ImagePre}
          register={register("pdfFile", { required: "El archivo PDF es obligatorio." })}
          error={errors.pdfFile}
          fileType="pdf"
          onFileChange={handleFileChange}
          onRemoveFile={() => handleRemoveFile("pdfFile")}
        />
        <Card
          title="Archivo de audio"
          SVG={AudioIcon}
          register={register("audioFile", { required: "El archivo de audio es obligatorio." })}
          error={errors.audioFile}
          fileType="audio"
          onFileChange={handleFileChange}
          onRemoveFile={() => handleRemoveFile("audioFile")}
        />
        <div className="flex w-full justify-end gap-4 mx-auto p-14">
          <Button text="Cancelar" variant="combCol2" SvgIcon={CancelIcon} />
          <Button
            type="submit"
            text="Subir archivos"
            variant="combCol1"
            SvgIcon={UploadIcon}
          />
        </div>
      </form>
    </div>
  );
};
