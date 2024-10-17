import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import LinearProgressComp from "../../../components/progress/linear";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import BackIcon from "../../../icons/back";
import Button from "../../../components/buttons/button";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import ButtonIcon from "../../../components/Buttons/buttonIcon";
import Modal from "../../../components/modal/modal";

export const Files = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedMessage, setUploadedMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    trigger,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      coverImage: null,
      pdfFile: null,
      audioFile: null,
    },
  });

  const coverImageRef = useRef(null);
  const pdfFileRef = useRef(null);
  const audioFileRef = useRef(null);

  const handleFileChange = async (fieldName, file, onChange, ref) => {
    if (file) {
      onChange(file);
      const isValid = await trigger(fieldName);

      if (isValid) {
        setProgress(0);
        setIsLoading(true);
        let message = "Archivo cargado con éxito";
        switch (fieldName) {
          case "coverImage":
            message = "Imagen de portada se cargó con éxito";
            break;
          case "pdfFile":
            message = "Archivo PDF se cargó con éxito";
            break;
          case "audioFile":
            message = "Archivo de audio se cargó con éxito";
            break;
          default:
            message = "Archivo cargado con éxito";
        }
        setUploadedMessage(message);
      }

      if (ref && ref.current) {
        ref.current.value = "";
      }
    } else {
      onChange(null);
      clearErrors(fieldName);
      setProgress(0);
      setIsLoading(false);
    }
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

  const onSubmit = async (data) => {
    try {
      setSubmitProgress(0);
      setIsSubmitting(true);

      const uploadProgress = setInterval(() => {
        setSubmitProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 200);

      const coverImageUrl = data.coverImage
        ? await uploadFileToSupabase(data.coverImage, "imagenes")
        : null;
      const pdfFileUrl = data.pdfFile
        ? await uploadFileToSupabase(data.pdfFile, "pdfs")
        : null;
      const audioFileUrl = data.audioFile
        ? await uploadFileToSupabase(data.audioFile, "audios")
        : null;

      clearInterval(uploadProgress);
      setSubmitProgress(100);

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
      localStorage.removeItem("title");
      localStorage.removeItem("synopsis");
      localStorage.removeItem("author");
      localStorage.removeItem("category");
      localStorage.removeItem("language");
      setIsSubmitting(false);
      toast.success("Archivos y datos subidos correctamente.", {
        position: "top-center",
        className: "bg-[#0E1217] text-primary-pri3",
        theme: "dark",
        transition: Zoom,
        autoClose: 1500,
        hideProgressBar: true,
        icon: false,
        onClose: () => navigate("/register"),
      });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitProgress(0);
      toast.error("Error al subir los archivos", {
        position: "top-center",
        className: "bg-[#0E1217] text-primary-pri3",
        theme: "dark",
        transition: Zoom,
        autoClose: 1500,
        hideProgressBar: true,
        icon: false,
      });
      console.error(error);
    }
  };
  const [isModalOpen, setIsModalOpen]= useState(false);

  const openmod = () => {
    setIsModalOpen(true);
  };
  const closemod =()=>{
    setIsModalOpen(false);
  };
  // const handleConfirm=()=>{
  //   console.log("Redirigiendo");
  //   navigate("/");
  // };
  return (
    <div className="flex min-h-screen flex-col bg-primary-pri3">
      <ToastContainer />
      <Navbar />

      <div className="h-0">
        {isLoading && <LinearProgressComp progress={progress} />}
      </div>
      <div className="h-0">
        {isSubmitting && (
          <div className="flex flex-col items-center w-full">
            <p className="text-neutral-neu0 font-body text-body-sm">Subiendo archivos y datos del libro...</p>
            <div className="w-full">
              <LinearProgressComp progress={submitProgress} />
            </div>
          </div>
        )}
      </div>

      <div className="mb-6 mt-10 pl-5 md:pl-8">
        <ButtonIcon SvgIcon={BackIcon} onClick={() => navigate("/register")} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col justify-center items-center gap-4 mx-3">
          <Controller
            name="coverImage"
            control={control}
            rules={{
              required: "La imagen de portada es requerida.",
              validate: {
                fileType: (file) => {
                  if (file) {
                    if (!["image/png", "image/jpeg"].includes(file.type)) {
                      return "Solo se permiten archivos PNG o JPG.";
                    }
                    const extension = file.name.split(".").pop().toLowerCase();
                    if (file.type === "image/jpeg" && extension !== "jpg") {
                      return "Solo se permiten archivos PNG o JPG (no JPEG).";
                    }
                  }
                  return true;
                },
                fileSize: (file) => {
                  if (file && file.size > 5 * 1024 * 1024) {
                    return "El archivo imagen no puede exceder 5MB.";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Card
                fieldName="coverImage"
                title="Imagen de portada"
                SVG={FrontIcon}
                onFileChange={(file) =>
                  handleFileChange("coverImage", file, onChange, coverImageRef)
                }
                value={value}
                error={errors.coverImage?.message}
                disablePreview={!!errors.coverImage}
                ref={coverImageRef} 
              />
            )}
          />

          <Controller
            name="pdfFile"
            control={control}
            rules={{
              required: "El archivo PDF es requerido.",
              validate: {
                fileType: (file) => {
                  if (file && file.type !== "application/pdf") {
                    return "Solo se permiten archivos PDF.";
                  }
                  return true;
                },
                fileSize: (file) => {
                  if (file && file.size > 60 * 1024 * 1024) {
                    return "El archivo PDF no puede exceder 60MB.";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Card
                fieldName="pdfFile"
                title="Archivo PDF"
                SVG={TextIcon}
                onFileChange={(file) =>
                  handleFileChange("pdfFile", file, onChange, pdfFileRef)
                }
                value={value}
                error={errors.pdfFile?.message}
                disablePreview={!!errors.pdfFile}
                ref={pdfFileRef} 
              />
            )}
          />

          <Controller
            name="audioFile"
            control={control}
            rules={{
              required: "El archivo de audio es requerido.",
              validate: {
                fileType: (file) => {
                  if (
                    file &&
                    !["audio/mpeg", "audio/mp3"].includes(file.type)
                  ) { 
                    return "Solo se permiten archivos MP3.";
                  }
                  return true;
                },
                fileSize: (file) => {
                  if (file && file.size > 600 * 1024 * 1024) {
                    return "El archivo audio no puede exceder 600MB.";
                  }
                  return true;
                },
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Card
                fieldName="audioFile"
                title="Archivo de audio"
                SVG={AudioIcon}
                onFileChange={(file) =>
                  handleFileChange("audioFile", file, onChange, audioFileRef)
                }
                value={value}
                error={errors.audioFile?.message}
                disablePreview={!!errors.audioFile}
                ref={audioFileRef} 
              />
            )}
          />
        </section>
        <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-6 mx-auto px-16 py-8 sm:py-10">
          <Button 
          text="Cancelar" 
          variant="combCol2" 
          SvgIcon={CancelIcon} 
          onClick={openmod}
          />
          {isModalOpen && <Modal 
            onClose={closemod} 
            text="¿Está seguro de Cancelar la subida de archivos?" 
            onConfirm = { ()=> {
              localStorage.removeItem("title");
              localStorage.removeItem("synopsis");
              localStorage.removeItem("author");
              localStorage.removeItem("category");
              localStorage.removeItem("language");
              navigate("/register")} }
          />}
          <Button
            type="submit"
            text="Subir archivos"
            variant="combCol1"
            SvgIcon={UploadIcon}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};
