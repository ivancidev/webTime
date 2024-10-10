// src/components/card.jsx
import React, { useState } from "react";

export const Card = ({ title, SVG, ImageSVG, register, error, fileType, onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileChange(event);  // Actualizar el estado en el formulario principal
  };

  const validationRules = {
    required: "Este campo es obligatorio.",
    validate: {
      fileType: (fileList) => {
        const file = fileList[0];
        if (!file) return "Debe seleccionar un archivo.";

        switch (fileType) {
          case "audio":
            return (
              (file.type === "audio/mpeg" || file.type === "audio/mp3" || file.name.endsWith(".mp3")) ||
              "Solo se permiten archivos de audio en formato .mp3"
            );
          case "pdf":
            return (
              (file.type === "application/pdf" || file.name.endsWith(".pdf")) ||
              "Solo se permiten archivos en formato .pdf"
            );
          case "image":
            return (
              (file.type === "image/jpeg" || file.type === "image/png" || file.name.endsWith(".jpg") || file.name.endsWith(".png")) ||
              "Solo se permiten imágenes en formato .jpg o .png"
            );
          default:
            return "Formato de archivo no permitido.";
        }
      },
    },
  };
  const validationAsterisk = <span className="text-error-err2">*</span>;
  return (
    <div className="w-[1000px] h-36 p-6 bg-transparent border border-neutral-neu2 rounded-[20px] flex flex-row justify-between">
      <div className="w-60 flex flex-col justify-center items-center">
        <div className="flex flex-row mb-4">
          <SVG className="w-6 h-6" />
          <h3 className="font-title text-title-sm text-primary-pri3 ml-4">
            {title} {validationAsterisk}
          </h3>
        </div>

        <input
          type="file"
          accept={ fileType === "audio" ? ".mp3" : fileType === "pdf" ? ".pdf" : "image/jpeg,image/png" }
          {...register}
          onChange={(e) => {
            handleFileChange(e); // Actualizar el estado local
          }}
          className="hidden"
          id={`upload-${title}`}
        />

        <label htmlFor={`upload-${title}`} className="cursor-pointer">
          <span className="text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 font-label rounded-[20px] h-10 pl-4 pr-5 text-label-sm text-center flex items-center">
            Elegir archivo
          </span>
        </label>
        
        {error && (
          <p className="text-error-err2 text-sm mt-2">
            {error.message}
          </p>
        )}
      </div>

      <div className="w-60 flex items-center">
        {file ? (
          file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-60 h-[106px] rounded-[20px]"
            />
          ) : file.type === "application/pdf" ? (
            <iframe
              src={URL.createObjectURL(file)}
              title="PDF Preview"
              className="w-60 h-[106px] rounded-[20px]"
            ></iframe>
          ) : (
            <p className="font-body text-body-lg text-primary-pri3">
              Archivo seleccionado: {file.name}
            </p>
          )
        ) : (
          <p className="font-body text-body-lg text-primary-pri3">
            No se eligió ningún archivo
          </p>
        )}
      </div>
    </div>
  );
};
