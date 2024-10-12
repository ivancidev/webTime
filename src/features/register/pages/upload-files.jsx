import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import { Card } from "../components/card";
import ImagePre from "../../../icons/imgPreview";
import CancelIcon from "../../../icons/cancel";
import UploadIcon from "../../../icons/upload";
import FrontIcon from "../../../icons/front";
import TextIcon from "../../../icons/text";
import AudioIcon from "../../../icons/audio";
import BackIcon from "../../../icons/back";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../../services/supabaseClient";
import Button from "../../../components/buttons/button";

export const Files = () => {
  const location = useLocation();
  const { state } = location;

  const [files, setFiles] = useState({
    coverImage: null,
    pdfFile: null,
    audioFile: null,
  });
  const handleFileChange = (fieldName, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fieldName]: file,
    }));
  };

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
