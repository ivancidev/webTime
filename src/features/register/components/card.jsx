import React, { useState } from "react";

export const Card = ({ fieldName, title, SVG, onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onFileChange(fieldName, selectedFile); 
  };

  const renderFilePreview = () => {
    if (!file) {
      return (
        <p className="font-body text-body-lg text-primary-pri3">
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
    <div className="w-[1000px] h-36 p-6 bg-transparent border border-neutral-neu2 rounded-[20px] flex flex-row justify-between">
      <div className="w-60 flex flex-col">
        <div className="flex flex-row mb-4">
          <SVG className="w-6 h-6" />
          <h3 className="font-title text-title-sm text-primary-pri3 ml-4">
            {title}
          </h3>
        </div>

        <input
          type="file"
          accept={
            fieldName === "coverImage"
              ? "image/jpeg,image/png"
              : fieldName === "pdfFile"
              ? "application/pdf"
              : "audio/*"
          }
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${fieldName}`}
        />

        <label htmlFor={`upload-${fieldName}`} className="cursor-pointer flex justify-center">
          <span className="text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 font-label rounded-[20px] h-10 w-32 flex items-center justify-center text-label-sm">
            Elegir archivo
          </span>
        </label>
      </div>

      <div className="w-60 flex items-center">{renderFilePreview()}</div>
    </div>
  );
};
