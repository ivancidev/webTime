import React, { useState, useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import LinearProgressComp from "../../../components/progress/linear";
import ImagePre from "../../../icons/imgPreview";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import Button from "../../../components/buttons/button";
import BackIcon from "../../../icons/back";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import ButtonIcon from "../../../components/buttons/buttonIcon";

export const Files = () => {
  const location = useLocation();
  const { state } = location;

  const [files, setFiles] = useState({
    coverImage: null,
    pdfFile: null,
    audioFile: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedMessage, setUploadedMessage] = useState("");

  const handleFileChange = (fieldName, file) => {
    setProgress(0);
    setIsLoading(true); // Activa la barra de progreso al seleccionar un archivo
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
    // Personalización del mensaje según el archivo subido
    let message = "Archivo subido con éxito";
    switch (fieldName) {
      case "coverImage":
        message = "Imagen de portada subida con éxito";
        break;
      case "pdfFile":
        message = "Archivo PDF subido con éxito";
        break;
      case "audioFile":
        message = "Archivo de audio subido con éxito";
        break;
      default:
        message = "Archivo subido con éxito";
    }
    setUploadedMessage(message);
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 20
        );
      }, 100);

      const minimumTime = setTimeout(() => {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          toast.success(uploadedMessage, {
            position: "top-center",
            className: "bg-[#0E1217] text-primary-pri3",
            theme: "dark",
            transition: Zoom,
            autoClose: 1500,
            hideProgressBar: true,
            icon: false,
          });
        }, 250); // Retardo opcional para que el progreso se vea completo
      }, 1000); // Mantener la barra visible por al menos 1 segundo

      return () => {
        clearTimeout(minimumTime);
        clearInterval(timer);
      };
    }
  }, [isLoading, uploadedMessage]);

  const uploadFileToSupabase = async (file, folderName) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from(folderName)
        .upload(fileName, file);
      if (error) {
        console.error(`Error uploading to ${folderName}:`, error);
        throw error;
      }

      const { data: publicURL, error: errorURL } = supabase.storage
        .from(folderName)
        .getPublicUrl(fileName);

      if (errorURL) {
        console.error(`Error getting public URL for ${fileName}:`, errorURL);
        throw errorURL;
      }

      return publicURL.publicUrl;
    } catch (error) {
      console.error("Error during file upload:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    try {
      const coverImageUrl = await uploadFileToSupabase(
        files.coverImage,
        "imagenes"
      );
      const pdfFileUrl = await uploadFileToSupabase(files.pdfFile, "pdfs");
      const audioFileUrl = await uploadFileToSupabase(
        files.audioFile,
        "audios"
      );

      const { error } = await supabase.from("libro").insert([
        {
          nombreLibro: state.title,
          sinopsis: state.synopsis,
          codAutor: state.author,
          codCategoria: state.category,
          codIdioma: state.language,
          enlacePortada: coverImageUrl,
          enlacePdf: pdfFileUrl,
          enlaceAudio: audioFileUrl,
        },
      ]);
      if (error) throw error;
      alert("Archivos y datos subidos correctamente.");
    } catch (error) {
      alert("Error al subir los archivos");
      console.error(error);
    } finally {
      setIsLoading(false); // Desactiva el progreso al finalizar la carga
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-primary-pri3">
      <ToastContainer />
      <Navbar />
      <div className="h-5">
        {isLoading && <LinearProgressComp progress={progress} />}
      </div>
      <div className="pl-8">
        <ButtonIcon SvgIcon={BackIcon} />
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
