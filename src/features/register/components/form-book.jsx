import React, { useEffect } from "react";
import { Navbar } from "../components/navbar";
import { Dropdown } from "../../../components/dropdown/dropdown";
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/input/input";
import FooterButtons from "../components/footer-buttons";
import { useNavigate } from "react-router-dom";
import { useGetTable } from "../../../hooks/use-get-table";

export default function FormBook() {
  const { data: authors } = useGetTable("autor");
  const { data: categories } = useGetTable("categoria");
  const { data: languages } = useGetTable("idioma");
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: localStorage.getItem("title") || "",
      author: localStorage.getItem("author") || "",
      category: localStorage.getItem("category") || "",
      language: localStorage.getItem("language") || "",
      synopsis: localStorage.getItem("synopsis") || "",
    },
  });

  // Watch values to keep localStorage updated
  const watchedTitle = watch("title");
  const watchedAuthor = watch("author");
  const watchedCategory = watch("category");
  const watchedLanguage = watch("language");
  const watchedSynopsis = watch("synopsis");

  useEffect(() => {
    localStorage.setItem("title", watchedTitle);
    setValue("title", watchedTitle); 
  }, [watchedTitle, setValue]); 

  useEffect(() => {
    localStorage.setItem("author", watchedAuthor);
  }, [watchedAuthor]);

  useEffect(() => {
    localStorage.setItem("category", watchedCategory);
  }, [watchedCategory]);

  useEffect(() => {
    localStorage.setItem("language", watchedLanguage);
  }, [watchedLanguage]);

  useEffect(() => {
    localStorage.setItem("synopsis", watchedSynopsis);
  }, [watchedSynopsis]);


  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("title");
      localStorage.removeItem("author");
      localStorage.removeItem("category");
      localStorage.removeItem("language");
      localStorage.removeItem("synopsis");
    };

 
    window.addEventListener("beforeunload", handleUnload);


    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);



  const onSubmit = (data) => {
    // Navegar a la siguiente página, y pasar el estado actual
    navigation("/upload-files", { state: data });
  };

  const onCancel = ()=>{
    navigation("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <Navbar/>
      <div className="flex flex-col items-center justify-center flex-grow">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[795px] mx-auto w-full">
          <h1 className="text-center text-secondary-sec2 m-[20px] font-title text-title-lg">
            Formulario de Registro de Libro
          </h1>
          <div className="px-10 md:px-3 lg:px-0 flex flex-col md:flex-row justify-between">
            <InputText
              name="title"
              label="Título"
              placeholder="Escribe aquí"
              className="w-full bg-transparent border-[1px] rounded border-neutral-neu0 md:w-[340px] h-[50px] p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md"
              value={watchedTitle}  
              onChange={(e) => setValue("title", e.target.value)} 
              register={register}
              errors={errors}
            />
            <Dropdown
              name="author"
              label="Autor"
              options={authors}
              placeholder="Seleccionar autor"
              register={register}
              errors={errors}
              value={watchedAuthor}
              onChange={(e) => setValue("author", e.target.value)}
              displayKey="nombreAutor"
              valueKey="codAutor"
            />
          </div>
          <div className="px-10 md:px-3 lg:px-0 flex flex-col md:flex-row justify-between">
            <Dropdown
              name="category"
              label="Categoría"
              options={categories}
              placeholder="Seleccionar categoría"
              register={register}
              errors={errors}
              value={watchedCategory}
              onChange={(e) => setValue("category", e.target.value)}
              displayKey="nombreCategoria"
              valueKey="codCategoria"
            />
            <Dropdown
              name="language"
              label="Idioma"
              options={languages}
              placeholder="Seleccionar idioma"
              register={register}
              errors={errors}
              value={watchedLanguage}
              onChange={(e) => setValue("language", e.target.value)}
              displayKey="idioma"
              valueKey="codIdioma"
            />
          </div>
          <div className="mt-7 px-10 md:px-3 lg:px-0">
            <label htmlFor="synopsis" className="py-1 text-primary-pri2 font-label text-label-lg">
              Sinopsis <span className="text-error-err2">*</span>
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              className="w-full h-[130px] bg-transparent border-[1px] rounded border-neutral-neu0 p-2 placeholder-neutral-neu0 text-primary-pri1  font-body text-body-md mt-2 resize-none"
              placeholder="Escribe aquí"
              {...register("synopsis", {
                required: "La sinopsis no puede estar vacía",
                pattern: {
                  value: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ .,;'"`’Üü\n]+$/s,
                  message: "Solo se permiten caracteres alfanuméricos",
                },
                maxLength: {
                  value: 1000,
                  message: "No se permite más de 1000 caracteres",
                },
                minLength: {
                  value: 2,
                  message: "No se permite menos de 2 caracteres",
                },
                validate: {
                  noMultipleSpacesOrNewlines: (value) => {
                    if (/ {2,}/.test(value)) {
                      return "No se permiten múltiples espacios en blanco consecutivos";
                    }
                    if (/\n{2,}/.test(value)) {
                      return "No se permiten múltiples saltos de línea consecutivos";
                    }
                    return true;
                  },
                },
              })}
            />
            {errors.synopsis && <span className="text-error-err2">{errors.synopsis.message}</span>}
          </div>
        </form>
      </div>
      <FooterButtons handleSubmit={handleSubmit} onSubmit={onSubmit} onCancel={onCancel}/>
    </div>
  );
}