import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import Button from "../../../components/buttons/button";
import BackIcon from "../../../icons/back";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";

export const Files = () => {
  const location = useLocation();
  const { state } = location;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange", // Cambiado a 'onChange' para validación inmediata
    defaultValues: {
      coverImage: null,
      pdfFile: null,
      audioFile: null,
    },
  });

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
      const coverImageUrl = data.coverImage
        ? await uploadFileToSupabase(data.coverImage, "imagenes")
        : null;
      const pdfFileUrl = data.pdfFile
        ? await uploadFileToSupabase(data.pdfFile, "pdfs")
        : null;
      const audioFileUrl = data.audioFile
        ? await uploadFileToSupabase(data.audioFile, "audios")
        : null;

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
      alert("Error al subir los archivos.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex items-center p-2">
        <Link to="/register">
          <BackIcon className="cursor-pointer" />
        </Link>
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
                  if (
                    file &&
                    !["image/png", "image/jpeg"].includes(file.type)
                  ) {
                    return "Solo se permiten archivos PNG o JPG.";
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
                onFileChange={onChange}
                value={value}
                error={errors.coverImage?.message}
                disablePreview={!!errors.coverImage} // Asegúrate de que sea booleano
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
                onFileChange={onChange}
                value={value}
                error={errors.pdfFile?.message}
                disablePreview={!!errors.pdfFile}
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
                  if (file && !["audio/mpeg", "audio/mp3"].includes(file.type)) {
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
                onFileChange={onChange}
                value={value}
                error={errors.audioFile?.message}
                disablePreview={!!errors.audioFile}
              />
            )}
          />
        </section>
        <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-6 mx-auto px-16 py-8 sm:py-10">
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
