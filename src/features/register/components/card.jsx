import React, { useEffect } from "react";
import Button from "../../../components/buttons/button";

export const Card = ({
  fieldName,
  title,
  SVG,
  onFileChange,
  value,
  error,
  disablePreview,
  clearErrors, // Opcional: Solo si deseas limpiar errores
}) => {
  let preview = null;

  if (value && !disablePreview) {
    if (value.type.startsWith("image/") || value.type === "application/pdf") {
      preview = URL.createObjectURL(value);
    }
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const renderFilePreview = () => {
    if (!value || disablePreview) {
      return (
        <p className="font-body text-body-md text-primary-pri2 mx-3">
          No se eligió ningún archivo
        </p>
      );
    }

    if (value.type.startsWith("image/")) {
      return (
        <img
          src={preview}
          alt="Preview"
          className="w-60 h-[106px] rounded-[20px]"
        />
      );
    } else if (value.type === "application/pdf") {
      return (
        <iframe
          src={preview}
          title="PDF Preview"
          className="w-60 h-[106px] rounded-[20px]"
        ></iframe>
      );
    }

    return (
      <p className="font-body text-body-md text-primary-pri1">
        Archivo seleccionado: {value.name}
      </p>
    );
  };

  const validationAsterisk = <span className="text-error-err2">*</span>;

  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (clearErrors) clearErrors(fieldName); // Limpia los errores si la función está disponible
  };

  return (
    <div className="max-w-[1000px] w-full md:h-36 p-6 bg-transparent border border-primary-pri1 rounded-[20px] flex flex-col-reverse justify-center items-center md:flex-row md:justify-between px-4 mx-auto">
      <div className="w-full md:w-60 flex flex-col justify-center items-start">
        <div className="flex flex-row mb-4">
          <SVG className="w-6 h-6" />
          <h3 className="font-title text-title-sm text-primary-pri1 ml-4">
            {title} {validationAsterisk}
          </h3>
        </div>

        <input
          type="file"
          accept={
            fieldName === "coverImage"
              ? "image/jpeg,image/png"
              : fieldName === "pdfFile"
              ? "application/pdf"
              : "audio/mpeg, audio/mp3"
          }
          onChange={handleInputChange}
          className="hidden"
          id={`upload-${fieldName}`}
        />
        <div className="w-full flex flex-row items-center justify-center space-x-2 md:space-x-4 md:ml-20">
          <label
            htmlFor={`upload-${fieldName}`}
            className="cursor-pointer flex justify-center"
          >
            <span className="text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 font-label rounded-[20px] h-10 w-32 flex items-center justify-center text-label-sm">
              Elegir archivo
            </span>
          </label>
          <Button
            type="button"
            text="Quitar archivo"
            onClick={handleRemoveFile}
            disabled={!value || disablePreview} // Actualización aquí
            variant={!value || disablePreview ? "combDesactivate" : "combCol1"} // Actualización aquí
          />
        </div>
        {error && <p className="text-error-err2 text-sm mt-2">{error}</p>}
      </div>

      <div className="w-60 flex items-center mb-4 md:mb-0 md:mt-0">{renderFilePreview()}</div>
    </div>
  );
};
