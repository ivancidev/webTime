import React, { useState } from "react";
import Button from "../../../components/buttons/button";

export const Card = ({ title, SVG, register, error, fileType, onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(event); // Actualizar el estado en el formulario principal solo si hay un nuevo archivo
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileChange({ target: { name: register.name, files: [] } }); // Limpia el archivo en el formulario principal
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
          accept={fileType === "audio" ? ".mp3" : fileType === "pdf" ? ".pdf" : "image/jpeg,image/png"}
          {...register}
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${title}`}
        />
<div className="flex flex-row space-x-4 ">
<label htmlFor={`upload-${title}`} className="cursor-pointer">
          <span className="ml-40 whitespace-nowrap text-primary-pri3 bg-secondary-sec2 hover:bg-secondary-sec1 font-label rounded-[20px] h-10 pl-4 pr-5 text-label-sm text-center flex items-center">
            Elegir archivo
          </span>
        </label>

        <Button
          type="button"
          text="Quitar archivo"
          onClick={removeFile}
          disabled={!file} // Deshabilitado si no hay archivo seleccionado
          variant={!file ? "combDesactivate" : "combCol1"} 
        />
</div>

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
