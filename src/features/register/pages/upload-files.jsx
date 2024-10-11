import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import LinearProgressComp from "../../../components/progress/linear"; // Asegúrate de que la ruta sea correcta
import ImagePre from "../../../icons/imgPreview";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import Button from "../../../components/Buttons/Button";
import BackIcon from "../../../icons/back";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Files = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [files, setFiles] = useState({
    coverImage: null,
    pdfFile: null,
    audioFile: null,
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el progreso
  const [progress, setProgress] = useState(0); // Estado del progreso

  useEffect(() => {
    if (isLoading) {
      //setProgress(0); // Resetea el progreso al iniciar

      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 100); // Aumenta más rápido para una vista más corta

      const minimumTime = setTimeout(() => {// Asegurar que la barra se muestre al menos 1.5 segundos
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 250); // La barra sigue visible un breve momento después de llegar a 100%
      }, 1500); // Mantener la barra visible por al menos 1.5 segundos

      return () => {
        clearTimeout(minimumTime);
        clearInterval(timer);
      };
    }
  }, [isLoading]);

  const handleFileChange = (fieldName, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
    setProgress(0);
    setIsLoading(true); // Activa la barra de progreso al seleccionar un archivo
  };

  const handleUpload = async () => {
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
    } finally {
      console.error("Se subio archivo con éxito");
      setIsLoading(false); // Desactiva el progreso al finalizar la carga
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className = "h-5">
        {isLoading && <LinearProgressComp progress={progress} />}
      </div>
      <div className="flex items-center p-2">
        <Link to="/register">
          <BackIcon className="cursor-pointer" />
        </Link>
      </div>
      <section className="flex flex-col justify-center items-center gap-4 mx-3">
        <Card
          fieldName="coverImage"
          title="Imagen de portada"
          SVG={FrontIcon}
          ImageSVG={ImagePre}
          onFileChange={handleFileChange}
        />
        <Card
          fieldName="pdfFile"
          title="Archivo PDF"
          SVG={TextIcon}
          ImageSVG={ImagePre}
          onFileChange={handleFileChange}
        />
        <Card
          fieldName="audioFile"
          title="Archivo de audio"
          SVG={AudioIcon}
          onFileChange={handleFileChange}
        />
      </section>
      <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-6 mx-auto px-16 py-8 sm:py-10">
        <Button text="Cancelar" variant="combCol2" SvgIcon={CancelIcon} />
        <Button
          text="Subir archivos"
          variant="combCol1"
          SvgIcon={UploadIcon}
          onClick={handleUpload}
        />
      </div>
    </div>
  );
};
