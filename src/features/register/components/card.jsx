import React, { useState } from "react";
import Button from "../../../components/buttons/Button";

export const Card = ({ title, SVG, onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileChange(title, selectedFile);  // Llama a la función para informar el cambio
  };

  const renderFilePreview = () => {
    if (!file) {
      return (
        <p className="font-body text-body-lg text-primary-pri3 mx-3">
          No se eligió ningún archivo
        </p>
      );
    }

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-60 h-[106px] rounded-[20px]"
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title="PDF Preview"
          className="w-60 h-[106px] rounded-[20px]"
        ></iframe>
      );
    }

    return (
      <p className="font-body text-body-lg text-primary-pri3">
        Archivo seleccionado: {file.name}
      </p>
    );
  };

  return (
    <div className="max-w-[1000px] w-full h-36 p-6 bg-transparent border border-neutral-neu2 rounded-[20px] flex flex-row justify-between px-4 mx-auto">
      <div className="w-60 flex flex-col justify-center items-center">
        <div className="flex flex-row mb-4">
          <SVG className="w-6 h-6" />
          <h3 className="font-title text-title-sm text-primary-pri3 ml-4">
            {title}
          </h3>
        </div>

        {/* Input de archivo */}
        <input
          type="file"
          accept={
            title === "Imagen de portada"
              ? "image/jpeg,image/png"
              : title === "Archivo PDF"
              ? "application/pdf"
              : "audio/*"
          }
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${title}`}
        />

        <label htmlFor={`upload-${title}`} className="cursor-pointer">
          <span className="text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 font-label rounded-[20px] h-10 pl-4 pr-5 text-label-sm text-center flex items-center">
            Elegir archivo
          </span>
        </label>
      </div>

      <div className="w-60 flex items-center">{renderFilePreview()}</div>
    </div>
  );
};
